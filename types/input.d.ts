import { QUIComponent } from './components'

/** The resizability of el-input component */
export type InputType = 'text' | 'textarea'
export type InputSize = 'large' | 'medium' | 'small'

/** Input Component */
export declare class QInput extends QUIComponent {
  /** Type of input */
  type: InputType

  /** Binding value */
  value: string | number

  /** Maximum Input text length */
  maxlength: number

  /** Minimum Input text length */
  minlength: number

  /** Placeholder of Input */
  placeholder: string

  /** Whether Input is disabled */
  disabled: boolean

  /** Size of Input, works when type is not 'textarea' */
  size: InputSize

  /** Prefix icon class */
  prefix: string

  /** Suffix icon class */
  suffix: string

  /** Same as name in native input */
  name: string

  /** Same as max in native input */
  max: any

  /** Same as min in native input */
  min: any

  /** Same as step in native input */
  step: any

  /** Same as autofocus in native input */
  autofocus: boolean

  /**
   * Focus the Input component
   */
  focus (): void

  /**
   * Blur the Input component
   */
  blur (): void
}
