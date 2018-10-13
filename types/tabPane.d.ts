import { QUIComponent } from './components'

/** TabPane Component */
export declare class QTabPane extends QUIComponent {
  /** the tabPane name of signal pane */
  label: string

  /** is tabpane focus */
  active: boolean

  /** is tabpane disabled */
  disabled: boolean

  /** the icon of tabpane */
  icon: string
}
