import "@testing-library/jest-dom";

// Fix for TextEncoder (required by react-router)
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

