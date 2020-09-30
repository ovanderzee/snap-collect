import snapCollect from '../src/index'
import { keying } from '../src/functions'

describe('Maintenance methods', () => {
    let snapCollection
    let tenting
    let tweaky
    let thirsty

    const rejectable = ['', NaN, null, undefined]
    const acceptable = [new Date(1234567890123), /^x/, ()=>{}]

    beforeEach(() => {
        snapCollection = snapCollect('id')
        tenting = {id: 10, text: 'tenting'}
        tweaky = {id: 20, text: 'tweaky'}
        thirsty = {id: 30, text: 'thirsty'}
    })

    describe('Keeping object as a reference', () => {
        test('should reflect live changes', () => {
            snapCollection.add(tweaky)

            tweaky.text = 'very tweaky'

            const subject = snapCollection.get(20)

            expect(subject.text).toBe('very tweaky')
        })
    })

    describe('Delete method', () => {
        const spyKeyMake = jest.spyOn(keying, 'make')
        beforeEach(() => {
            jest.clearAllMocks();
        });
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
        test('should accept usefull keys', () => {
            acceptable.forEach(accept => {
                snapCollection.delete(accept)
            })

            expect(spyKeyMake).toHaveBeenCalledTimes(acceptable.length)
        })
        test('should reject useless keys', () => {
            rejectable.forEach(reject => {
                snapCollection.delete(reject)
            })

            expect(spyKeyMake).not.toHaveBeenCalled()
        })
    })

    describe('Get method', () => {
        const spyKeyMake = jest.spyOn(keying, 'make')
        beforeEach(() => {
            jest.clearAllMocks();
        });
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
        test('should accept usefull keys', () => {
            acceptable.forEach(accept => {
                snapCollection.get(accept)
            })

            expect(spyKeyMake).toHaveBeenCalledTimes(acceptable.length)
        })
        test('should reject useless keys', () => {
            rejectable.forEach(reject => {
                snapCollection.get(reject)
            })

            expect(spyKeyMake).not.toHaveBeenCalled()
        })
    })

    describe('Has method', () => {
        const spyHasOwnProp = jest.spyOn(Object.prototype, 'hasOwnProperty')
        beforeEach(() => {
            jest.clearAllMocks();
        });
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
        test('should accept usefull keys', () => {
            acceptable.forEach(accept => {
                snapCollection.has(accept)
            })

            expect(spyHasOwnProp).toHaveBeenCalledTimes(acceptable.length)
        })
        test('should reject useless keys', () => {
            rejectable.forEach(reject => {
                snapCollection.has(reject)
            })

            expect(spyHasOwnProp).not.toHaveBeenCalled()
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
        test('should accept usefull keys', () => {
            const length = snapCollection.length
            acceptable.forEach(accept => snapCollection.set(accept, thirsty))
            // console.log('keys', snapCollection.keys())

            expect(snapCollection.length).toBe(acceptable.length)
        })
        test('should reject useless keys', () => {
            const length = snapCollection.length
            rejectable.forEach(reject => snapCollection.set(reject, thirsty))

            expect(snapCollection.length).toBe(length)
        })
    })

})
