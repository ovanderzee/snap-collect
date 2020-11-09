import snapCollect from '../src/index'

describe('Yielding methods', () => {
    let snapCollection
    let tenting
    let tweaky
    let thirsty
    let forthy
    let vivid
    let array1
    let array2
    let arrayA
    let arrayB

    beforeEach(() => {
        snapCollection = snapCollect('id')
        tenting = {id: 10, text: 'tenting'}
        tweaky = {id: 20, text: 'tweaky'}
        thirsty = {id: 30, text: 'thirsty'}
        forthy = {id: 40, text: 'forthy'}
        vivid = {id: 50, text: 'vivid'}
        array1 = [tenting, tweaky, thirsty, forthy]
        array2 = [tweaky, thirsty, forthy, vivid]
        arrayA = [tenting, tweaky]
        arrayB = [forthy, vivid]
    })

    // entries, keys and values rely on native methods
    describe('Native methods', () => {
        test('should show entries with keys as string', () => {
            snapCollection.add(...array1)

            const entriesArray = snapCollection.entries()

            expect(entriesArray).toEqual([
                ['10', tenting],
                ['20', tweaky],
                ['30', thirsty],
                ['40', forthy],
            ])
        })
        test('should show keys as string', () => {
            snapCollection.add(...array1)

            const keysArray = snapCollection.keys()

            expect(keysArray).toEqual(['10', '20', '30', '40'])
        })

        test('should show values', () => {
            snapCollection.add(...array1)

            const valuesArray = snapCollection.values()

            expect(valuesArray).toEqual([
                {id: 10, text: 'tenting'},
                {id: 20, text: 'tweaky'},
                {id: 30, text: 'thirsty'},
                {id: 40, text: 'forthy'},
            ])
        })
    })

    describe('Sort method', () => {

        let sortOfFun

        beforeEach(() => {
            sortOfFun = [
                {id: 10, level: 10, text: 'tan'},
                {id: 11, level: 10, text: 'zen'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 21, level: 50, text: 'fixie'},
                {id: 30, level: 3, text: 'tree'},
                {id: 31, level: 3, text: 'eat'},
            ]
        })

        test('should show all values', () => {
            snapCollection.add(...sortOfFun)
            const sortedArray = snapCollection.sort('text')

            sortOfFun.forEach(item => {
                expect(sortedArray).toContain(item)
            })
        })

        test('should show string values sorted ascending', () => {
            snapCollection.add(...sortOfFun)
            const textSort = snapCollection.sort('text')

            expect(textSort).toEqual([
                {id: 31, level: 3, text: 'eat'},
                {id: 21, level: 50, text: 'fixie'},
                {id: 10, level: 10, text: 'tan'},
                {id: 30, level: 3, text: 'tree'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 11, level: 10, text: 'zen'},
            ])
        })

        test('should show numeric values sorted ascending', () => {
            snapCollection.add(...sortOfFun)
            const numericSort = snapCollection.sort('level')

            expect(numericSort).toEqual([
                {id: 30, level: 3, text: 'tree'},
                {id: 31, level: 3, text: 'eat'},
                {id: 10, level: 10, text: 'tan'},
                {id: 11, level: 10, text: 'zen'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 21, level: 50, text: 'fixie'},
            ])
        })

        test('should show all values multiple sorted ascending', () => {
            snapCollection.add(...sortOfFun)
            const ascendingSort = snapCollection.sort('level', 'text')

            expect(ascendingSort).toEqual([
                {id: 31, level: 3, text: 'eat'},
                {id: 30, level: 3, text: 'tree'},
                {id: 10, level: 10, text: 'tan'},
                {id: 11, level: 10, text: 'zen'},
                {id: 21, level: 50, text: 'fixie'},
                {id: 20, level: 50, text: 'vivid'},
            ])
        })

        test('should deal with records containing null values', () => {
            snapCollection.add(...sortOfFun)
            snapCollection.add(
                {id: 12, level: 10, text: null},
                {id: 13, level: null, text: 'then'},
                {id: 14, level: 10, text: null},
                {id: 15, level: null, text: 'tan'},
            )
            const nullSort = snapCollection.sort('level', 'text')

            expect(nullSort).toEqual([
                {id: 31, level: 3, text: 'eat'},
                {id: 30, level: 3, text: 'tree'},
                {id: 10, level: 10, text: 'tan'},
                {id: 11, level: 10, text: 'zen'},
                {id: 12, level: 10, text: null},
                {id: 14, level: 10, text: null},
                {id: 21, level: 50, text: 'fixie'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 15, level: null, text: 'tan'},
                {id: 13, level: null, text: 'then'},
            ])
        })

        test('should deal with records missing some fields 1', () => {
            snapCollection.add(...sortOfFun)
            snapCollection.add(
                {id: 12, level: 10},
                {id: 13, text: 'then'},
                {id: 14, level: 10},
                {id: 15, text: 'tan'},
            )
            const ascendingSort = snapCollection.sort('level', 'text')

            expect(ascendingSort).toEqual([
                {id: 31, level: 3, text: 'eat'},
                {id: 30, level: 3, text: 'tree'},
                {id: 10, level: 10, text: 'tan'},
                {id: 11, level: 10, text: 'zen'},
                {id: 12, level: 10},
                {id: 14, level: 10},
                {id: 21, level: 50, text: 'fixie'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 15, text: 'tan'},
                {id: 13, text: 'then'},
            ])
        })

        test('should deal with records missing some fields 2', () => {
            snapCollection.add(...sortOfFun)
            snapCollection.add(
                {id: 12, level: 10},
                {id: 13, text: 'then'},
                {id: 14, level: 10},
                {id: 15, text: 'tan'},
            )
            const ascendingSort = snapCollection.sort('text', 'level')

            expect(ascendingSort).toEqual([
                {id: 31, level: 3, text: 'eat'},
                {id: 21, level: 50, text: 'fixie'},
                {id: 10, level: 10, text: 'tan'},
                {id: 15, text: 'tan'},
                {id: 13, text: 'then'},
                {id: 30, level: 3, text: 'tree'},
                {id: 20, level: 50, text: 'vivid'},
                {id: 11, level: 10, text: 'zen'},
                {id: 12, level: 10},
                {id: 14, level: 10},
            ])
        })
    })

    describe('Where method', () => {

        test('should show a subset with JSON.stringify comparison', () => {
            snapCollection.add(...array1, {id: 60})
            const subsetArray = snapCollection.where({text: undefined})

            expect(subsetArray).toEqual([
                {id: 60},
            ])
        })

        test('should show a subset with same-type equality', () => {
            snapCollection.add(...array1, {id: 60})
            const subsetArray = snapCollection.where({id: '60'})

            expect(subsetArray).toEqual([])
        })

        test('should show a subset matching all comparsions', () => {
            snapCollection.add(...array1, {id: 60})
            const subsetArray = snapCollection.where({id: 60, text: undefined})

            expect(subsetArray).toEqual([
                {id: 60},
            ])
        })

        test('should show a subset with same-value objects', () => {
            const coord = {x: 10, y: 12}
            snapCollection.add(
                ...array1,
                {id: 60, coord: {x: 10, y: 12}},
                {id: 70, coord: coord},
            )
            const subsetArray = snapCollection.where({coord: coord})

            expect(subsetArray).toEqual([
                {id: 60, coord: {x: 10, y: 12}},
                {id: 70, coord: {x: 10, y: 12}},
            ])
        })
    })

    describe('Combination method', () => {
        test('should display all values once - with an Array', () => {
            snapCollection.add(...array1)

            const newArray = snapCollection.combination(array2)

            expect(newArray).toEqual([tenting, tweaky, thirsty, forthy, vivid])
        })
        test('should display shared values once - with another SnapCollect', () => {
            snapCollection.add(...array1)
            let otherCollection = snapCollect('id')
            otherCollection.add(...array2)

            const newArray = snapCollection.combination(otherCollection)

            expect(newArray).toEqual([tenting, tweaky, thirsty, forthy, vivid])
        })
        test('should not change the source values', () => {
            snapCollection.add(...array1)

            const newArray = snapCollection.combination(array2)

            expect(snapCollection.keys()).toEqual(['10', '20', '30', '40'])
            expect(snapCollection.values()).toEqual([
                {id: 10, text: 'tenting'},
                {id: 20, text: 'tweaky'},
                {id: 30, text: 'thirsty'},
                {id: 40, text: 'forthy'},
            ])
            expect(array2).toEqual([tweaky, thirsty, forthy, vivid])
        })
    })

    describe('Intersection method', () => {
        test('should display shared values once - with an array', () => {
            snapCollection.add(...array1)

            const newArray = snapCollection.intersection(array2)

            expect(newArray).toEqual([tweaky, thirsty, forthy])
        })
        test('should display shared values once - with another SnapCollect', () => {
            snapCollection.add(...array1)
            let otherCollection = snapCollect('id')
            otherCollection.add(...array2)

            const newArray = snapCollection.intersection(otherCollection)

            expect(newArray).toEqual([tweaky, thirsty, forthy])
        })
        test('should display no shared values without overlap', () => {
            snapCollection.add(...arrayA)

            const newArray = snapCollection.intersection(arrayB)

            expect(newArray).toEqual([])
        })
        test('should not change the source values', () => {
            snapCollection.add(...array1)

            const newArray = snapCollection.intersection(array2)

            expect(snapCollection.keys()).toEqual(['10', '20', '30', '40'])
            expect(snapCollection.values()).toEqual([
                {id: 10, text: 'tenting'},
                {id: 20, text: 'tweaky'},
                {id: 30, text: 'thirsty'},
                {id: 40, text: 'forthy'},
            ])
            expect(array2).toEqual([tweaky, thirsty, forthy, vivid])
        })
    })
})
