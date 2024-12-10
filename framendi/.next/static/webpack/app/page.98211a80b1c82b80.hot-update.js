"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HomePage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction HomePage() {\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    // Check if an order (expense) exists for the given email\n    async function checkOrderByEmail(email) {\n        // Fetch all expenses from your server\n        const res = await fetch(\"http://localhost:3001/api/expenses\", {\n            method: \"GET\"\n        });\n        if (!res.ok) {\n            throw new Error(\"Failed to fetch expenses from backend\");\n        }\n        const expenses = await res.json();\n        // Check if any expense has a name matching the email\n        const existingOrder = expenses.some((expense)=>expense.name.toLowerCase() === email.toLowerCase());\n        return existingOrder;\n    }\n    async function handleStartOrder() {\n        const orderExists = await checkOrderByEmail(email);\n        if (orderExists) {\n            // Pass email as query param so next screen can load prefilled data\n            router.push(\"/select-dish?email=\".concat(encodeURIComponent(email)));\n        } else {\n            // Start fresh\n            router.push(\"/select-dish\");\n        }\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto p-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"container mx-0 p-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"-inset-x-80 mb-8 flex space-x-4 justify-center\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            src: \"/photos/sample1.jpg\",\n                            alt: \"Sample 1\",\n                            width: 128,\n                            height: 128,\n                            className: \"object-cover\"\n                        }, void 0, false, {\n                            fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                            lineNumber: 47,\n                            columnNumber: 9\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            src: \"/photos/sample2.jpg\",\n                            alt: \"Sample 2\",\n                            width: 128,\n                            height: 128,\n                            className: \"object-cover\"\n                        }, void 0, false, {\n                            fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 9\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            src: \"/photos/sample3.jpg\",\n                            alt: \"Sample 3\",\n                            width: 128,\n                            height: 128,\n                            className: \"object-cover\"\n                        }, void 0, false, {\n                            fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                            lineNumber: 61,\n                            columnNumber: 9\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 7\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"align-items items-end text-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"mb-4\",\n                        children: \"Enter your email to continue your order or start a new one:\"\n                    }, void 0, false, {\n                        fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                        lineNumber: 72,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"email\",\n                        value: email,\n                        onChange: (e)=>setEmail(e.target.value),\n                        className: \"border p-2 rounded mr-2 text-black\",\n                        placeholder: \"you@example.com\"\n                    }, void 0, false, {\n                        fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                        lineNumber: 75,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleStartOrder,\n                        className: \"bg-blue-500 text-white p-2 rounded\",\n                        children: \"Start Order\"\n                    }, void 0, false, {\n                        fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                        lineNumber: 82,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n                lineNumber: 71,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ingiharalds/Next/Lokaverkefni/Lokaverkefni/framendi/src/app/page.tsx\",\n        lineNumber: 43,\n        columnNumber: 5\n    }, this);\n}\n_s(HomePage, \"LXpdMFNEXRCTNfEizw2eNDOypCM=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = HomePage;\nvar _c;\n$RefreshReg$(_c, \"HomePage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFd0M7QUFDVDtBQUNhO0FBRTdCLFNBQVNJOztJQUN0QixNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR0wsK0NBQVFBLENBQUM7SUFDbkMsTUFBTU0sU0FBU0osMERBQVNBO0lBRXhCLHlEQUF5RDtJQUN6RCxlQUFlSyxrQkFBa0JILEtBQWE7UUFDNUMsc0NBQXNDO1FBQ3RDLE1BQU1JLE1BQU0sTUFBTUMsTUFBTSxzQ0FBc0M7WUFDNURDLFFBQVE7UUFDVjtRQUNBLElBQUksQ0FBQ0YsSUFBSUcsRUFBRSxFQUFFO1lBQ1gsTUFBTSxJQUFJQyxNQUFNO1FBQ2xCO1FBQ0EsTUFBTUMsV0FBVyxNQUFNTCxJQUFJTSxJQUFJO1FBRS9CLHFEQUFxRDtRQUNyRCxNQUFNQyxnQkFBZ0JGLFNBQVNHLElBQUksQ0FDakMsQ0FBQ0MsVUFDQ0EsUUFBUUMsSUFBSSxDQUFDQyxXQUFXLE9BQU9mLE1BQU1lLFdBQVc7UUFFcEQsT0FBT0o7SUFDVDtJQUVBLGVBQWVLO1FBQ2IsTUFBTUMsY0FBYyxNQUFNZCxrQkFBa0JIO1FBRTVDLElBQUlpQixhQUFhO1lBQ2YsbUVBQW1FO1lBQ25FZixPQUFPZ0IsSUFBSSxDQUFDLHNCQUFnRCxPQUExQkMsbUJBQW1CbkI7UUFDdkQsT0FBTztZQUNMLGNBQWM7WUFDZEUsT0FBT2dCLElBQUksQ0FBQztRQUNkO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ0U7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNEO2dCQUFJQyxXQUFVOzBCQUVmLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUN4QixrREFBS0E7NEJBQ0p5QixLQUFJOzRCQUNKQyxLQUFJOzRCQUNKQyxPQUFPOzRCQUNQQyxRQUFROzRCQUNSSixXQUFVOzs7Ozs7c0NBRVosOERBQUN4QixrREFBS0E7NEJBQ0p5QixLQUFJOzRCQUNKQyxLQUFJOzRCQUNKQyxPQUFPOzRCQUNQQyxRQUFROzRCQUNSSixXQUFVOzs7Ozs7c0NBRVosOERBQUN4QixrREFBS0E7NEJBQ0p5QixLQUFJOzRCQUNKQyxLQUFJOzRCQUNKQyxPQUFPOzRCQUNQQyxRQUFROzRCQUNSSixXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OzswQkFLZCw4REFBQ0Q7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDSzt3QkFBRUwsV0FBVTtrQ0FBTzs7Ozs7O2tDQUdwQiw4REFBQ007d0JBQ0NDLE1BQUs7d0JBQ0xDLE9BQU83Qjt3QkFDUDhCLFVBQVUsQ0FBQ0MsSUFBTTlCLFNBQVM4QixFQUFFQyxNQUFNLENBQUNILEtBQUs7d0JBQ3hDUixXQUFVO3dCQUNWWSxhQUFZOzs7Ozs7a0NBRWQsOERBQUNDO3dCQUNDQyxTQUFTbkI7d0JBQ1RLLFdBQVU7a0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1UO0dBcEZ3QnRCOztRQUVQRCxzREFBU0E7OztLQUZGQyIsInNvdXJjZXMiOlsiL1VzZXJzL2luZ2loYXJhbGRzL05leHQvTG9rYXZlcmtlZm5pL0xva2F2ZXJrZWZuaS9mcmFtZW5kaS9zcmMvYXBwL3BhZ2UudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lUGFnZSgpIHtcbiAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgLy8gQ2hlY2sgaWYgYW4gb3JkZXIgKGV4cGVuc2UpIGV4aXN0cyBmb3IgdGhlIGdpdmVuIGVtYWlsXG4gIGFzeW5jIGZ1bmN0aW9uIGNoZWNrT3JkZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgICAvLyBGZXRjaCBhbGwgZXhwZW5zZXMgZnJvbSB5b3VyIHNlcnZlclxuICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDozMDAxL2FwaS9leHBlbnNlc1wiLCB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBleHBlbnNlcyBmcm9tIGJhY2tlbmRcIik7XG4gICAgfVxuICAgIGNvbnN0IGV4cGVuc2VzID0gYXdhaXQgcmVzLmpzb24oKTtcblxuICAgIC8vIENoZWNrIGlmIGFueSBleHBlbnNlIGhhcyBhIG5hbWUgbWF0Y2hpbmcgdGhlIGVtYWlsXG4gICAgY29uc3QgZXhpc3RpbmdPcmRlciA9IGV4cGVuc2VzLnNvbWUoXG4gICAgICAoZXhwZW5zZTogeyBuYW1lOiBzdHJpbmcgfSkgPT5cbiAgICAgICAgZXhwZW5zZS5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGVtYWlsLnRvTG93ZXJDYXNlKClcbiAgICApO1xuICAgIHJldHVybiBleGlzdGluZ09yZGVyO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlU3RhcnRPcmRlcigpIHtcbiAgICBjb25zdCBvcmRlckV4aXN0cyA9IGF3YWl0IGNoZWNrT3JkZXJCeUVtYWlsKGVtYWlsKTtcblxuICAgIGlmIChvcmRlckV4aXN0cykge1xuICAgICAgLy8gUGFzcyBlbWFpbCBhcyBxdWVyeSBwYXJhbSBzbyBuZXh0IHNjcmVlbiBjYW4gbG9hZCBwcmVmaWxsZWQgZGF0YVxuICAgICAgcm91dGVyLnB1c2goYC9zZWxlY3QtZGlzaD9lbWFpbD0ke2VuY29kZVVSSUNvbXBvbmVudChlbWFpbCl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0YXJ0IGZyZXNoXG4gICAgICByb3V0ZXIucHVzaChcIi9zZWxlY3QtZGlzaFwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyIG14LWF1dG8gcC04XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lciBteC0wIHAtNlwiPlxuICAgICAgey8qIFNpbXBsZSBwbGFjZWhvbGRlciBcImNhcm91c2VsXCIgLSBBZGQgd2lkdGgvaGVpZ2h0IGZvciBOZXh0LmpzIEltYWdlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCItaW5zZXQteC04MCBtYi04IGZsZXggc3BhY2UteC00IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgIDxJbWFnZVxuICAgICAgICAgIHNyYz1cIi9waG90b3Mvc2FtcGxlMS5qcGdcIlxuICAgICAgICAgIGFsdD1cIlNhbXBsZSAxXCJcbiAgICAgICAgICB3aWR0aD17MTI4fVxuICAgICAgICAgIGhlaWdodD17MTI4fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1jb3ZlclwiXG4gICAgICAgIC8+XG4gICAgICAgIDxJbWFnZVxuICAgICAgICAgIHNyYz1cIi9waG90b3Mvc2FtcGxlMi5qcGdcIlxuICAgICAgICAgIGFsdD1cIlNhbXBsZSAyXCJcbiAgICAgICAgICB3aWR0aD17MTI4fVxuICAgICAgICAgIGhlaWdodD17MTI4fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1jb3ZlclwiXG4gICAgICAgIC8+XG4gICAgICAgIDxJbWFnZVxuICAgICAgICAgIHNyYz1cIi9waG90b3Mvc2FtcGxlMy5qcGdcIlxuICAgICAgICAgIGFsdD1cIlNhbXBsZSAzXCJcbiAgICAgICAgICB3aWR0aD17MTI4fVxuICAgICAgICAgIGhlaWdodD17MTI4fVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1jb3ZlclwiXG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFsaWduLWl0ZW1zIGl0ZW1zLWVuZCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJtYi00XCI+XG4gICAgICAgICAgRW50ZXIgeW91ciBlbWFpbCB0byBjb250aW51ZSB5b3VyIG9yZGVyIG9yIHN0YXJ0IGEgbmV3IG9uZTpcbiAgICAgICAgPC9wPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgIHZhbHVlPXtlbWFpbH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJib3JkZXIgcC0yIHJvdW5kZWQgbXItMiB0ZXh0LWJsYWNrXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cInlvdUBleGFtcGxlLmNvbVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdGFydE9yZGVyfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcC0yIHJvdW5kZWRcIlxuICAgICAgICA+XG4gICAgICAgICAgU3RhcnQgT3JkZXJcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiSW1hZ2UiLCJ1c2VSb3V0ZXIiLCJIb21lUGFnZSIsImVtYWlsIiwic2V0RW1haWwiLCJyb3V0ZXIiLCJjaGVja09yZGVyQnlFbWFpbCIsInJlcyIsImZldGNoIiwibWV0aG9kIiwib2siLCJFcnJvciIsImV4cGVuc2VzIiwianNvbiIsImV4aXN0aW5nT3JkZXIiLCJzb21lIiwiZXhwZW5zZSIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImhhbmRsZVN0YXJ0T3JkZXIiLCJvcmRlckV4aXN0cyIsInB1c2giLCJlbmNvZGVVUklDb21wb25lbnQiLCJkaXYiLCJjbGFzc05hbWUiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsInAiLCJpbnB1dCIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwiYnV0dG9uIiwib25DbGljayJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});