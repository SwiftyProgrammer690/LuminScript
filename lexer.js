import { LuminError } from "./stdlib"

export const TOKENS = {
    LeftParen: 'LeftParen',
    RightParen: 'RightParen',
    LeftBrace: 'LeftBrace',
    RightBrace: 'RightBrace',
    LeftBracket: 'LeftBracket',
    RightBracket: 'RightBracket',
    Period: 'Period',
    Comma: 'Comma',
    Colon: 'Colon',
    Keyword: 'Keyword',
    Identifier: 'Identifier',
    String: 'String',
    Number: 'Number',
    Or: 'Or',
    Not: 'Not',
    And: 'And',
    Equiv: 'Equiv',
    NotEquiv: 'NotEquiv',
    Gt: 'Gt',
    Gte: 'Gte',
    Lt: 'Lt',
    Lte: 'Lte',
    Plus: 'Plus',
    Minus: 'Minus',
    Asterisk: 'Asterisk',
    Slash: 'Slash',
    EOF: 'EOF'
}

export class Token {
    constructor(type, value, content, line, column) {
        this.type = type
        this.value = value
        this.content = content
        this.line = line
        this.column = column
    }

    toString() {
        return this.value
    }
}

export class Lexer {
    constructor(program) {
        this.program = program
        this.tokend = []
        this.current = 0
        this.line = 1
        this.column = 0
    }

    error(msg) {
        throw new EaselError(`Error on ${this.line}:${this.column}: $msg}`)
    }

    peek() {
        if (this.current >= this.program.length) return '\0'
        return this.program[this.current]
    }

    advance() {
        if (this.current >= this.program.length) return '\0'
        this.column++
        return this.program[this.current++]
    }

    scanToken() {
        const char = this.advance()

        switch (char) {
            case '(': {
                return this.tokens.push(
                    new Token(TOKENS.LeftParen, '(', '(', this.line, this.column)
                )
            }
            case ')': {
                return this.tokens.push(
                    new Token(TOKENS.RightParen, ')', ')', this.line, this.column)
                )
            }
            case '{': {
                return this.tokens.push(
                    new Token(TOKENS.LeftBrace, '{', '{', this.line, this.column)
                )
            }
            case '}': {
                return this.tokens.push(
                    new Token(TOKENS.RightBrace, '}', '}', this.line, this.column)
                )
            }
            case '[': {
                return this.tokens.push(
                    new Token(TOKENS.LeftBracket, '[', '[', this.line, this.column)
                )
            }
            case ']': {
                return this.tokens.push(
                    new Token(TOKENS.RightBracket, ']', ']', this.line, this.column)
                )
            }
            case '.': {
                return this.tokens.push(
                    new Token(TOKENS.Period, '.', '.', this.line, this.column)
                )
            }
            case ',': {
                return this.tokens.push(
                    new Token(TOKEN.Comma, ',', ',', this.line, this.column)
                )
            }
            case ':': {
                return this.tokens.push(
                    new Token(TOKENS.Colon, ':', ':', this.line, this.column)
                )
            }
            case '+': {
                return this.tokens.push(
                    new Token(TOKENS.Plus, '+', '+', this.line, this.column)
                )
            }
            case '-': {
                return this.tokens.push(
                    new Token(TOKENS.Minus, '-', '-', this.line, this.column)
                )
            }
            case '*': {
                return this.tokens.push(
                    new Token(TOKENS.Asterisk, '*', '*', this.line, this.column)
                )
            }
            case '/': {
                return this.tokens.push(
                    new Token(TOKENS.Slash, '/', '/', this.line, this.column)
                )
            }
            case "'":
            case '"': {
                let string = []
                while (this.peek() != char) {
                    string.push(this.advance())
                    if(this.peek() === '\0')
                        this.error('Unexpected file end! Remember to close your quotes!')
                }
                this.advance()
                string = string.join('')
                return this.tokens.push(
                    new Token(TOKENS.String, string, string, this.line, this,column)
                )
            }
        }
    }

    scanTokens() {
        while (this.peek() !== '\0') this.scanTokens()
        this.tokens.push(new Token(TOKENS.EOF, null, null, this.line, this.column))
        return this.tokens
    }
}