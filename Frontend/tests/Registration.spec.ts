import { test, expect } from "@playwright/test";
import REPL from '../src/components/REPL';
import {CommandRegistry} from './CommandRegistration';
import { mode } from "../functions/Mode";
import { load } from "../functions/Load";
import { view } from "../functions/View";
import { search } from "../functions/Search";


