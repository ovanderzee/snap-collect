import snapCollect from '../src/index'

describe('SnapCollect initialise', () => {
    test('should fail with a falsy identifiers', () => {
        expect(function () {snapCollect(null)}).toThrow()
        expect(function () {snapCollect(NaN)}).toThrow()
        expect(function () {snapCollect('')}).toThrow()
        expect(function () {snapCollect(undefined)}).toThrow()
    })
    test('should work with a truthy identifier', () => {
        expect(function () {snapCollect('id')}).not.toThrow()
        expect(function () {snapCollect('name')}).not.toThrow()
    })
})

describe('SnapCollect recognisability', () => {
    let snapCollection

    beforeEach(() => {
        snapCollection = snapCollect('index')
    })

    test('should include a truthy identifier property', () => {
        expect(snapCollection.identifier).toBeTruthy()
    })
    test('should include a name property "SnapCollect"', () => {
        expect(snapCollection.name).toBe('SnapCollect')
    })
})

describe('SnapCollect instance integrity', () => {
    let collection1
    let collection2

    beforeEach(() => {
        collection1 = snapCollect('index')
        collection2 = snapCollect('key')
    })

    test('should work with varying identifiers', () => {
        expect(collection1.identifier).not.toEqual(collection2.identifier)
    })
    test('should work with the same prototype', () => {
        expect(collection1.add).toBe(collection2.add)
    })
})
