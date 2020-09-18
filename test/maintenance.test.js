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

    describe('Keeping object as a reference', () => {
        test('should reflect live changes', () => {
            snapCollection.add(tweaky)

            tweaky.text = 'very tweaky'

            const subject = snapCollection.get(20)

            expect(subject.text).toBe('very tweaky')
        })
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
    })

    describe('Delete method', () => {
        test('should delete an object from the collection', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            expect(snapCollection.length).toBe(3)

            snapCollection.delete(10)

            expect(snapCollection.length).toBe(2)
        })
        test('should not change the subject', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            expect(snapCollection.get(10)).toBe(tenting)

            snapCollection.delete(10)

            expect(tenting).toEqual({id: 10, text: 'tenting'})
        })
    })

    describe('Get method', () => {
        test('should get an object from the collection', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            const subject = snapCollection.get(10)

            expect(subject).toBe(tenting)
        })
        test('should not change the subject', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            const subject = snapCollection.get(10)

            expect(subject).toEqual({id: 10, text: 'tenting'})
        })
    })

    describe('Has method', () => {
        test('should test whether the collection has an object', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            const bool = snapCollection.has(10)

            expect(bool).toBe(true)
        })
        test('should not change the subject', () => {
            snapCollection.add(tenting, tweaky, thirsty)

            const bool = snapCollection.has(10)

            expect(snapCollection.get(10)).toEqual({id: 10, text: 'tenting'})
        })
    })

    describe('Length getter', () => {
        test('should count the object in the collection', () => {
            expect(snapCollection.length).toBe(0)

            snapCollection.add(tenting, tweaky, thirsty)
            snapCollection.delete(30)

            expect(snapCollection.length).toBe(2)
        })
    })

    describe('Set method', () => {
        test('should set an object in the collection', () => {
            snapCollection.set(thirsty.id, thirsty)

            expect(snapCollection.get(thirsty.id)).toEqual({id: 30, text: 'thirsty'})
        })
        test('should not change the subject', () => {
            snapCollection.set(thirsty.id, thirsty)

            expect(snapCollection.get(thirsty.id)).toEqual({id: 30, text: 'thirsty'})
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
