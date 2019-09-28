import * as yaml from 'js-yaml';

describe('TODO - Add a test suite', () => {
    it('TODO - Add a test', async () => { });
});

// tests to make sure yaml is reading the 
// required contexts without errors

// to ignore the required contexts add an empty array 
test('load empty array', () => {
    const requiredContexts: string[] = yaml.load("[]");
    expect(requiredContexts.length).toBe(0);
});

// to provide a subset of required contexts provide an array with contexts
test('load array', () => {
    const requiredContexts: string[] = yaml.load("['install','build', 'deploy']");
    expect(requiredContexts.length).toBe(3);
});

// check reading boolean true
test('check boolean', () => {
    const autoMerge: boolean = yaml.load('true');
    expect(autoMerge).toBe(true);
});

// check reading boolean false
test('check boolean', () => {
    const autoMerge: boolean = yaml.load('false');
    expect(autoMerge).toBe(false);
});