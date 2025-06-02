import * as fs from "fs";
import { glob } from "glob";
import { VocabularyGenerator } from "./vocabulary-generator";
import { join } from "path";

describe("VocabularyGenerator", () => {
    /**
     * Delete all files with the specified extension in the target directory using a glob pattern.
     * @param pattern Glob pattern for files to delete (e.g., 'test/*.ts')
     */
    async function cleanDirectory(pattern: string) {
        const items = await glob(pattern);

        for (let file of items) {
            fs.unlinkSync(file);
        }
    }

    /**
     * Check if the files exist and have a size greater than 0.
     * @param files A list of files to check.
     * @param deleteFiles Delete the files after checking.
     */
    async function checkFiles(files: string[], deleteFiles: boolean = true) {
        try {
            for (let file of files) {
                const exists = fs.existsSync(file);

                expect(exists).toBeTruthy();

                const stats = fs.statSync(file);

                expect(stats.size).toBeGreaterThan(0);
            }
        }
        catch (error) {
            throw error;
        }
        finally {
            if (deleteFiles) {
                for (let file of files.filter(f => fs.existsSync(f))) {
                    fs.unlinkSync(file);
                }
            }
        }
    }

    it('can generate vocabulary modules from files', async () => {
        const generator = new VocabularyGenerator();

        await cleanDirectory('test/*.ts');

        let result = await generator.parseFile('test/skos.ttl');

        checkFiles([result], true);

        try {
            result = await generator.parseFile('test/nonexisting.ttl');

            fail();
        } catch (error) {
            expect(error).toBeDefined();

            expect(fs.existsSync('test/nonexisting.ts')).toBeFalsy();
        }
    });

    it('can generate vocabulary modules from directories', async () => {
        const generator = new VocabularyGenerator();
        
        await cleanDirectory('test/*.ts');

        let files = await generator.parseDirectory('test/*.ttl');

        expect(files.length).toBeGreaterThan(0);
        expect(fs.existsSync('test/index.ts')).toBeFalsy();

        await checkFiles(files);
        await cleanDirectory('test/*.ts');

        files = await generator.parseDirectory('test/*.ttl', true);

        expect(files.length).toBeGreaterThan(1);
        expect(fs.existsSync(join('test', generator.indexFileName))).toBeTruthy();

        await checkFiles(files);
        await cleanDirectory('test/*.ts');

        files = await generator.parseDirectory('test/*.ttl', true, true);

        expect(files.length).toBeGreaterThan(2);
        expect(fs.existsSync(join('test', generator.indexFileName))).toBeTruthy();
        expect(fs.existsSync(join('test', generator.sourceFileName))).toBeTruthy();

        await checkFiles(files);
        await cleanDirectory('test/*.ts');
    });
});