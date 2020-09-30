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

    describe('Cross method', () => {
        test('should confine the collection the intersection with a foreign item', () => {
            snapCollection.add(...array1)

            expect(snapCollection.length).toBe(4)

            snapCollection.cross(array2)

            expect(snapCollection.length).toBe(3)
        })
        test('should not change the input', () => {
            snapCollection.add(...array1)
            snapCollection.cross(array2)

            expect(array1).toEqual([tenting, tweaky, thirsty, forthy])
            expect(array2).toEqual([tweaky, thirsty, forthy, vivid])
        })
    })

    describe('Drop method', () => {
        const collection = [
            {id:1, action:'cut', text:'bye'},
            {id:2, action:'drop', text:'bye'},
            {id:3, action:'drop', text:'adios'},
        ]
        test('should remove matching objects from the collection', () => {
            snapCollection.add(...collection)

            expect(snapCollection.length).toBe(3)

            snapCollection.drop({action: 'drop'})

            expect(snapCollection.length).toBe(1)
        })
        test('should operate and-wise', () => {
            snapCollection.add(...collection)

            expect(snapCollection.length).toBe(3)

            snapCollection.drop({action:'drop', text:'bye'})

            expect(snapCollection.length).toBe(2)
        })
    })

    describe('Hold method', () => {
        const collection = [
            {id:1, action:'hold', text:'hi'},
            {id:2, action:'keep', text:'hi'},
            {id:3, action:'keep', text:'hello'},
        ]
        test('should remove matching objects from the collection', () => {
            snapCollection.add(...collection)

            expect(snapCollection.length).toBe(3)

            snapCollection.hold({action: 'keep'})

            expect(snapCollection.length).toBe(2)
        })
        test('should operate and-wise', () => {
            snapCollection.add(...collection)

            expect(snapCollection.length).toBe(3)

            snapCollection.hold({action:'keep', text:'hi'})

            expect(snapCollection.length).toBe(1)
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
