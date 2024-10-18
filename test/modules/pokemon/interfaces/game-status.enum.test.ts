import { GameStatus } from "@/modules/pokemon/interfaces"

describe('GameStatus enum', () => {
    test('should have value of playing', () => {
        expect(GameStatus.Playing).toBe('playing')
    })
    test('should have value of won', () => {
        expect(GameStatus.Won).toBe('won')
    })
    test('should have value of lost', () => {
        expect(GameStatus.Lost).toBe('lost')
    })
})