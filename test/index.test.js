
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

    test('should include a truthy identifier property on the prototype', () => {
        expect(snapCollection.__proto__.identifier).toBeTruthy()
    })
    test('should include a name property "SnapCollect" on the prototype ', () => {
        expect(snapCollection.__proto__.name).toBe('SnapCollect')
    })
})
