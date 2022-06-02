import { defineStore } from 'pinia'
import {
  PlusMinus,
  Percentage,
  Divide,
  Times,
  Minus,
  Plus,
  Equal,
} from '../assets/index'

interface IKeys {
  key: string
  isImg?: boolean
  img?: string
  isOp?: boolean
}

interface ICalcState {
  keys: Array<IKeys>
  currentValue: string
  prevValue: string
  resultValue: boolean
  history: Array<any>
  answerValue: string
}

export const useCalcStore = defineStore({
  id: 'calculator',

  state: (): ICalcState => ({
    keys: [
      {
        key: 'AC',
        isImg: false,
      },
      {
        key: '+/-',
        isImg: true,
        img: PlusMinus,
      },
      {
        key: '%',
        isImg: true,
        img: Percentage,
      },
      {
        key: '/',
        isImg: true,
        img: Divide,
        isOp: true,
      },
      {
        key: '7',
        isImg: false,
      },
      {
        key: '8',
        isImg: false,
      },
      {
        key: '9',
        isImg: false,
      },
      {
        key: 'x',
        isImg: true,
        img: Times,
        isOp: true,
      },
      {
        key: '4',
        isImg: false,
      },
      {
        key: '5',
        isImg: false,
      },
      {
        key: '6',
        isImg: false,
      },
      {
        key: '-',
        isImg: true,
        img: Minus,
        isOp: true,
      },
      {
        key: '1',
        isImg: false,
      },
      {
        key: '2',
        isImg: false,
      },
      {
        key: '3',
        isImg: false,
      },
      {
        key: '+',
        isImg: true,
        img: Plus,
        isOp: true,
      },
      {
        key: '0',
        isImg: false,
      },
      {
        key: '.',
        isImg: false,
      },
      {
        key: '=',
        isImg: true,
        img: Equal,
        isOp: true,
      },
    ],
    currentValue: '0',
    prevValue: '',
    resultValue: false,
    history: [],
    answerValue: '',
  }),

  getters: {
    getListKey: (state) => state.keys,
    getCurrentValue: (state) => state.currentValue,
    filteredHistory: (state) => {
      let junk = state.history
      if (junk.length > 4) {
        junk = junk.slice(-4)
      }

      const filterItems = junk.filter(
        (item: string) => item !== state.prevValue // For delete history same in new history
      )
      return filterItems
    },
  },

  actions: {
    clearAll() {
      this.currentValue = '0'
      this.prevValue = '0'
      this.resultValue = false
      this.answerValue = ''
    },

    setPlusMinus() {
      if (this.currentValue === '0') return
      if (this.answerValue.charAt(this.answerValue.length - 1) === '-') return
      this.currentValue =
        this.currentValue.charAt(0) === '-'
          ? this.currentValue.slice(1)
          : '-' + this.currentValue
    },

    getPercentage() {
      const percent = Number(this.currentValue) / 100
      this.currentValue = String(percent)
    },

    setDot() {
      if (this.currentValue.includes('.')) return
      if (this.currentValue === '') this.currentValue = '0'

      const lastChar = this.currentValue.charAt(this.currentValue.length - 1)
      if (['+', '-', 'x', '/', '*'].includes(lastChar)) return

      this.currentValue += '.'
    },

    setValue(value: string) {
      this.resultValue = false
      this.currentValue =
        this.currentValue === '0' ? value : this.currentValue + value
    },

    operationFunc(value: string) {
      const lastCharCurrent = this.currentValue.charAt(
        this.currentValue.length - 1
      )
      const includesLastCharCurrent = ['+', '-', 'x', '/', '*', '.'].includes(
        lastCharCurrent
      )

      if (includesLastCharCurrent) {
        this.currentValue = this.currentValue.slice(0, -1)
      }

      switch (value) {
        case '+':
          this.currentValue = this.currentValue + '+'
          break
        case '-':
          this.currentValue = this.currentValue + '-'
          break
        case 'x':
          this.currentValue = this.currentValue + '*'
          break
        case '/':
          this.currentValue = this.currentValue + '/'
          break
      }

      const firtValueFromCurrent = this.currentValue.charAt(0)
      if (['+', '-', 'x', '/', '*', '.'].includes(firtValueFromCurrent)) {
        this.answerValue = this.answerValue.slice(0, -1)
      }

      this.answerValue = `${this.answerValue}${this.currentValue}`
      this.currentValue = ''
    },

    doCalculate() {
      if (this.resultValue) return // Disable calculate more than 1 time

      const lastChar = this.currentValue.charAt(this.currentValue.length - 1)
      if (['+', '-', 'x', '/', '*', '.'].includes(lastChar)) return

      const all = this.answerValue + this.currentValue
      const result = eval(all)

      this.currentValue = String(result)
      this.prevValue = all + '=' + result // Set Prev value for history now
      this.answerValue = ''

      this.history.push(this.prevValue)
      this.setToLocalStorage()

      this.resultValue = true
    },

    // Local Storage Function
    setFromMount() {
      this.history = JSON.parse(localStorage.getItem('history') || '[]')
    },

    clearHistory() {
      this.history = []
      this.setToLocalStorage()
    },

    setToLocalStorage() {
      localStorage.setItem('history', JSON.stringify(this.history))
    },
  },
})
