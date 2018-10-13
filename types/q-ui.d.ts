import Vue from 'vue'
import { QUIComponent } from './components'

import { QTooltip } from './tooltip'
import { QButton } from './button'
import { QTab } from './tab'
import { QTabPane } from './tabPane'
import { QInput } from './input'

export function install (vue: typeof Vue): void

export type Component = QUIComponent

export class Tooltip extends QTooltip {}
export class Button extends QButton {}
export class Tab extends QTab {}
export class TabPane extends QTabPane {}
export class Input extends QInput {}