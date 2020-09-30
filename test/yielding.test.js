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
