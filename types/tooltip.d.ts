import { QUIComponent } from './components'

export type Theme = 'Dark' | 'Light'

/** Tooltip Component */
export declare class QTooltip extends QUIComponent {
  /** Tooltip theme */
  theme: Theme

  /** Display content, can be overridden by slot#content */
  content: String

  /** Position of Tooltip */
  position: String

}
