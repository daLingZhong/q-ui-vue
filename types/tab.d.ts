import { QUIComponent } from './components'

export type Type = 'card' | null
export type Position = 'top' | 'bottom' | 'left' | 'right'

/** Tab Component */
export declare class QTab extends QUIComponent {
  /** Tab of theme card or default */
  type: Type

  /** Position of Tab */
  position: Position

  /** editable of Tab */
  editable: boolean
}
