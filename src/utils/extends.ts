import { format } from 'date-fns'
declare global {
  interface String {
    toInt(this: string): number
    toDate(this: string): Date
  }
  interface Number {
    formatDate(this: number, type: string): string
  }
  interface Date {
    formatDate(this: Date, type?: string): string
  }
}
String.prototype.toInt = function (this: string): number {
  return Number.parseInt(this)
}
String.prototype.toDate = function (this: string) {
  if (!this) return new Date()
  return new Date(this)
}
Date.prototype.formatDate = function (this: Date, type = 'MM-dd HH:mm') {
  return format(this.getTime(), type)
}
Number.prototype.formatDate = function (
  this: Date | number,
  type = 'MM-dd HH:mm'
) {
  return format(this, type)
}
