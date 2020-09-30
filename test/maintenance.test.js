import snapCollect from '../src/index'

describe('Maintenance methods', () => {
    let snapCollection
    let tenting
    let tweaky
    let thirsty
    let forthy
    let vivid
    let array1
    let array2

    beforeEach(() => {
        snapCollection = snapCollect('id')
        tenting = {id: 10, text: 'tenting'}
        tweaky = {id: 20, text: 'tweaky'}
        thirsty = {id: 30, text: 'thirsty'}
        forthy = {id: 40, text: 'forthy'}
        vivid = {id: 50, text: 'vivid'}
        array1 = [tenting, tweaky, thirsty, forthy]
        array2 = [tweaky, thirsty, forthy, vivid]
    })

    describe('Add method', () => {
        test('should add multiple objects to the collection', () => {
            expect(snapCollection.length).toBe(0)

            snapCollection.add(tenting, tweaky, thirsty)

            expect(snapCollection.length).toBe(3)
        })
        test('should add destructured object-arrays to the collection', () => {
            expect(snapCollection.length).toBe(0)

            snapCollection.add(...array1, ...array2)

            expect(snapCollection.length).toBe(5)
        })
        test('should not change the input', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            expect(snapCollection.get(10)).toBe(tenting)
            expect(snapCollection.get(10)).toEqual({id: 10, text: 'tenting'})
        })
    })

    describe('Clear method', () => {
        test('should delete all own objects from the collection', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            snapCollection.clear()

            expect(snapCollection.length).toBe(0)
        })
        test('should not change the collection object', () => {
            snapCollection.add(tenting, tweaky, thirsty)
            const reference = snapCollection

            snapCollection.clear()

            expect(reference).toBe(snapCollection)
        })
        test('should not break the API', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            snapCollection.clear()

            expect(typeof snapCollection.clear).toBe('function')
        })
    })

    describe('Toggle method', () => {
        test('should toggle the existence of an object in the collection', () => {
            snapCollection.toggle(tweaky)

            expect(snapCollection.length).toBe(1)

            snapCollection.toggle(tweaky)

            expect(snapCollection.length).toBe(0)
        })
        test('should not change the subject', () => {
            snapCollection.toggle(tweaky)

            expect(tweaky).toEqual({id: 20, text: 'tweaky'})

            snapCollection.toggle(tweaky)

            expect(tweaky).toEqual({id: 20, text: 'tweaky'})
        })
    })

})
