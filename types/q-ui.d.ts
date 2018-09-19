import Vue from 'vue'
import { QUIComponent } from './components'

import { QTooltip } from './tooltip'
import { QButton } from './button'

export function install (vue: typeof Vue): void

export type Component = QUIComponent

export class Tooltip extends QTooltip {}
export class Button extends QButton {}