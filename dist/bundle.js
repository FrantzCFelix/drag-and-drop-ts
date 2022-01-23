/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComponentBase": () => (/* binding */ ComponentBase)
/* harmony export */ });
class ComponentBase {
    constructor(templateElementId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateElementId);
        this.hostElement = document.getElementById(hostElementId);
        this.element = document.importNode(this.templateElement.content, true).firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__.ComponentBase {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputEl = this.element.querySelector('#title');
        this.peopleInputEl = this.element.querySelector('#people');
        this.textAreaDescriptionEl = this.element.querySelector('#description');
        this.submitButtonEl = this.element.querySelector('button');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() {
    }
    gatherUserInput() {
        const title = this.titleInputEl.value;
        const description = this.textAreaDescriptionEl.value;
        const people = this.peopleInputEl.value;
        const titleOptions = {
            value: title,
            required: true,
            minLength: 5,
            maxLength: 30,
        };
        const descriptionOptions = {
            value: description,
            required: true,
            minLength: 5,
            maxLength: 255,
        };
        const peopleOptions = {
            value: parseInt(people),
            required: true,
            min: 1,
            max: 10
        };
        if (!(0,_util_validation__WEBPACK_IMPORTED_MODULE_3__.validate)(titleOptions) || !(0,_util_validation__WEBPACK_IMPORTED_MODULE_3__.validate)(descriptionOptions) || !(0,_util_validation__WEBPACK_IMPORTED_MODULE_3__.validate)(peopleOptions)) {
            alert('Invalid Input, try again');
            return;
        }
        else {
            return [title, description, parseInt(people)];
        }
    }
    clearInputs() {
        this.titleInputEl.value = "";
        this.peopleInputEl.value = "";
        this.textAreaDescriptionEl.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectItem": () => (/* binding */ projectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class projectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__.ComponentBase {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} people`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_event) {
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragstart', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.project.description;
        this.element.querySelector('p').textContent = `${this.persons} working on this`;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], projectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], projectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_0__.ComponentBase {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === 'active' ? _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active : _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const releventProjects = projects.filter((project) => {
                if (this.type === 'active') {
                    return project.status === _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active;
                }
                return project.status === _models_project_model__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished;
            });
            this.assignedProjects = releventProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    renderProjects() {
        const ulistEl = document.getElementById(`${this.type}-projects-list`);
        ulistEl.innerHTML = '';
        for (const prjtItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.projectItem(this.element.querySelector('ul').id, prjtItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const newDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return newDescriptor;
}


/***/ }),

/***/ "./src/models/project-model.ts":
/*!*************************************!*\
  !*** ./src/models/project-model.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "singleProject": () => (/* binding */ singleProject)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class singleProject {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStateManager": () => (/* binding */ ProjectStateManager),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project-model */ "./src/models/project-model.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectStateManager extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectStateManager();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project_model__WEBPACK_IMPORTED_MODULE_0__.singleProject(Math.random().toString(), title, description, numOfPeople, _models_project_model__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectStateManager.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength !== undefined && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength !== undefined && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.trim().length <= validatableInput.maxLength;
    }
    if (validatableInput.min !== undefined && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max !== undefined && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN0RTtJQUNELElBQUksZ0JBQWdCLENBQUMsR0FBRyxLQUFLLFNBQVMsSUFBSSxPQUFPLGdCQUFnQixDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDbEYsT0FBTyxHQUFHLE9BQU8sSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLElBQUksZ0JBQWdCLENBQUMsR0FBRztLQUN0RTtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7VUM3Qkw7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEQ7QUFDRjtBQUl0RCxJQUFJLG1FQUFZLEVBQUUsQ0FBQztBQUNuQixJQUFJLGlFQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsSUFBSSxpRUFBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL2RyYWctYW5kLWRyb3AtdHMvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL2RyYWctYW5kLWRyb3AtdHMvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLXRzLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy8uL3NyYy9tb2RlbHMvcHJvamVjdC1tb2RlbC50cyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLXRzLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy8uL3NyYy91dGlsL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLXRzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLXRzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC10cy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYWctYW5kLWRyb3AtdHMvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIiAvLyBDb21wb25lbnQgQmFzZSBjbGFzc1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudEJhc2U8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICAgICAgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgICAgICAgZWxlbWVudDogVTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlRWxlbWVudElkOiBzdHJpbmcsIGhvc3RFbGVtZW50SWQ6IHN0cmluZywgaW5zZXJ0QXRTdGFydDogYm9vbGVhbiwgbmV3RWxlbWVudElkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVFbGVtZW50SWQpISBhcyBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgdHJ1ZSkuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnRJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgYXR0YWNoKGluc2VydEF0QmVnaW5uaW5nOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmVnaW5uaW5nID8gJ2FmdGVyYmVnaW4nIDogJ2JlZm9yZWVuZCcsIHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgLy9EaWZmZXJlbnQgd2F5IHRvIGFwcGVuZCB0ZW1wbGF0ZSBpbnRvIGRpdiB0YWdcclxuICAgICAgICAgICAgLy8gY29uc3QgdGVtcGxhdGVDbG9uZSA9IHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmhvc3RFbGVtZW50LmFwcGVuZENoaWxkKHRlbXBsYXRlQ2xvbmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICAgICAgICBhYnN0cmFjdCByZW5kZXJDb250ZW50KCk6IHZvaWQ7XHJcbiAgICB9XHJcbiIsImltcG9ydCB7Q29tcG9uZW50QmFzZX0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcclxuaW1wb3J0IHtwcm9qZWN0U3RhdGV9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XHJcbmltcG9ydCB7YXV0b2JpbmR9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcbmltcG9ydCB7dmFsaWRhdGUsVmFsaWRhdG9yT2JqZWN0IH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvblwiO1xyXG5cclxuICAgIC8qUHJvamVjdElucHV0IENsYXNzKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnRCYXNlPEhUTUxEaXZFbGVtZW50LCBIVE1MRm9ybUVsZW1lbnQ+e1xyXG4gICAgICAgIHRpdGxlSW5wdXRFbDogSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICBwZW9wbGVJbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIHRleHRBcmVhRGVzY3JpcHRpb25FbDogSFRNTFRleHRBcmVhRWxlbWVudDtcclxuICAgICAgICBzdWJtaXRCdXR0b25FbDogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoJ3Byb2plY3QtaW5wdXQnLCAnYXBwJywgdHJ1ZSwgJ3VzZXItaW5wdXQnKVxyXG4gICAgICAgICAgICAvLyBjb25zdCB0ZW1wbGF0ZVByb2plY3RJbnB1dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtaW5wdXQnKTtcclxuICAgICAgICAgICAgLy8gaWYodGVtcGxhdGVQcm9qZWN0SW5wdXRFbCl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IHRlbXBsYXRlUHJvamVjdElucHV0RWwgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlSW5wdXRFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW9wbGUnKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0QXJlYURlc2NyaXB0aW9uRWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0QnV0dG9uRWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uJykhIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuYXR0YWNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRoaXMudGV4dEFyZWFEZXNjcmlwdGlvbkVsLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBwZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWwudmFsdWU7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgdGl0bGVPcHRpb25zOiBWYWxpZGF0b3JPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdGl0bGUsXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogNSxcclxuICAgICAgICAgICAgICAgIG1heExlbmd0aDogMzAsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb25PcHRpb25zOiBWYWxpZGF0b3JPYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1pbkxlbmd0aDogNSxcclxuICAgICAgICAgICAgICAgIG1heExlbmd0aDogMjU1LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBlb3BsZU9wdGlvbnM6IFZhbGlkYXRvck9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJzZUludChwZW9wbGUpLFxyXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDEwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZSh0aXRsZU9wdGlvbnMpIHx8ICF2YWxpZGF0ZShkZXNjcmlwdGlvbk9wdGlvbnMpIHx8ICF2YWxpZGF0ZShwZW9wbGVPcHRpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgSW5wdXQsIHRyeSBhZ2FpbicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sIHBhcnNlSW50KHBlb3BsZSldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZUlucHV0RWwudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnBlb3BsZUlucHV0RWwudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnRleHRBcmVhRGVzY3JpcHRpb25FbC52YWx1ZSA9IFwiXCI7XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgQGF1dG9iaW5kXHJcbiAgICAgICAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh1c2VySW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgJHt0aXRsZX0sICR7ZGVzY3JpcHRpb259LCAke3Blb3BsZX1gKTtcclxuICAgICAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcklucHV0cygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiIsImltcG9ydCB7RHJhZ2dhYmxlfSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcC1pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50QmFzZX0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcclxuaW1wb3J0IHtQcm9qZWN0fSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3QtbW9kZWxcIjtcclxuaW1wb3J0IHthdXRvYmluZH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuXHJcbiAgICAgLyoqUHJvamVjdCBJdGVtICovXHJcbiAgICBleHBvcnQgY2xhc3MgcHJvamVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnRCYXNlPEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMSUVsZW1lbnQ+IGltcGxlbWVudHMgRHJhZ2dhYmxlIHtcclxuICAgICAgICAvL3ByaXZhdGUgcHJvamVjdDogUHJvamVjdFxyXG4gICAgXHJcbiAgICAgICAgZ2V0IHBlcnNvbnMoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJzEgcGVyc29uJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlb3BsZWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBAYXV0b2JpbmRcclxuICAgICAgICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBAYXV0b2JpbmRcclxuICAgICAgICBkcmFnRW5kSGFuZGxlcihfZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDMnKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykhLnRleHRDb250ZW50ID0gYCR7dGhpcy5wZXJzb25zfSB3b3JraW5nIG9uIHRoaXNgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIiwiaW1wb3J0IHtEcmFnVGFyZ2V0fSBmcm9tIFwiLi4vbW9kZWxzL2RyYWctZHJvcC1pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7Q29tcG9uZW50QmFzZX0gZnJvbSBcIi4vYmFzZS1jb21wb25lbnRcIjtcclxuaW1wb3J0IHtQcm9qZWN0LCBQcm9qZWN0U3RhdHVzfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3QtbW9kZWxcIjtcclxuaW1wb3J0IHthdXRvYmluZH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHtwcm9qZWN0U3RhdGV9IGZyb20gXCIuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlXCI7XHJcbmltcG9ydCB7cHJvamVjdEl0ZW19IGZyb20gXCIuL3Byb2plY3QtaXRlbVwiO1xyXG5cclxuXHJcblxyXG4gICAgLypQcm9qZWN0TGlzdCBDbGFzcyovXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvamVjdExpc3QgZXh0ZW5kcyBDb21wb25lbnRCYXNlPEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICAgICAgICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcclxuICAgICAgICAgICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCBmYWxzZSwgYCR7dHlwZX0tcHJvamVjdHNgKVxyXG4gICAgICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgQGF1dG9iaW5kXHJcbiAgICAgICAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICAgICAgICAgICAgLy9BbGxvd3MgeW91IHRvIG1ha2UgdGhlIGl0ZW0gZHJvcHBhYmxlXHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICAgICAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEBhdXRvYmluZFxyXG4gICAgICAgIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICAgICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KHByaklkLCB0aGlzLnR5cGUgPT09J2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBAYXV0b2JpbmRcclxuICAgICAgICBkcmFnTGVhdmVIYW5kbGVyKF9ldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgICAgICAgICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcik7XHJcbiAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsZXZlbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3Quc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZlbnRQcm9qZWN0cztcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9zaG91bGQgYmUgcHJpdmF0ZSBidXQgYWJzdGFyY3QgcHJpdmF0ZSBjbGFzc2VzIGFyZSBub3Qgc3VwcG9ydGVkIGluIHR5cGVTY3JpcHQuXHJcbiAgICAgICAgcmVuZGVyQ29udGVudCgpIHtcclxuICAgICAgICAgICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQgPSBsaXN0SWRcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gYCR7dGhpcy50eXBlLnRvVXBwZXJDYXNlKCl9IFBST0pFQ1RTYFxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHVsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgICAgICAgICAgdWxpc3RFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwcmp0SXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgICAgICAgICAgIG5ldyBwcm9qZWN0SXRlbSh0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSEuaWQsIHByanRJdGVtKVxyXG4gICAgXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdEl0ZW0udGl0bGU7XHJcbiAgICAgICAgICAgICAgICAvLyAvL2NvbnNvbGUubG9nKGxpc3RJdGVtKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gdWxpc3RFbC5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiIsIiAgICAgLy8gYXV0b2JpbmQgZGVjb3JhdG9yXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYXV0b2JpbmQoXzogYW55LCBfMjogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgQXV0b2JpbmQgZnVuY3Rpb24gJHt0YXJnZXR9YCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEF1dG9iaW5kIGZ1bmN0aW9uICR7bWV0aG9kTmFtZX1gKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhgQXV0b2JpbmQgZnVuY3Rpb24gJHtPYmplY3Qua2V5cyhkZXNjcmlwdG9yKX1gKTtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhib3VuZEZuKTsgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld0Rlc2NyaXB0b3I7XHJcbiAgICB9XHJcblxyXG4iLCIgICAgZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7IEFjdGl2ZSwgRmluaXNoZWQgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdCB7XHJcbiAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICAgICAgcGVvcGxlOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdHVzOiBQcm9qZWN0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qU2luZ2xlUHJvamVjdCBjbGFzcyovXHJcbiAgICBleHBvcnQgY2xhc3Mgc2luZ2xlUHJvamVjdCBpbXBsZW1lbnRzIFByb2plY3Qge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nLFxyXG4gICAgICAgICAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHB1YmxpYyBwZW9wbGU6IG51bWJlcixcclxuICAgICAgICAgICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4iLCJpbXBvcnQge1Byb2plY3QsUHJvamVjdFN0YXR1cyxzaW5nbGVQcm9qZWN0fSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3QtbW9kZWxcIjtcclxuXHJcbiAgICB0eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XHJcblxyXG4gICAgYWJzdHJhY3QgY2xhc3MgU3RhdGU8VD57XHJcbiAgICAgICAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdXHJcbiAgICBcclxuICAgICAgICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFByb2plY3Qgc3RhdGUgbWFuYWdlbWVudCBjbGFzc1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZU1hbmFnZXIgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgICAgICAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZU1hbmFnZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGVNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIG51bU9mUGVvcGxlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBzaW5nbGVQcm9qZWN0KE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBudW1PZlBlb3BsZSxcclxuICAgICAgICAgICAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlKVxyXG4gICAgICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByaiA9PiBwcmouaWQgPT09IHByb2plY3RJZClcclxuICAgICAgICAgICAgaWYocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKXtcclxuICAgICAgICAgICAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpe1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFN0YXRlIG1hbmFnZXIgaW5zdGFuY2VcclxuICAgIGV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGVNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcblxyXG4iLCIgICAgZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0b3JPYmplY3Qge1xyXG4gICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICAgICAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gICAgICAgIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICAgICAgICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgICAgICAgbWluPzogbnVtYmVyO1xyXG4gICAgICAgIG1heD86IG51bWJlcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiBWYWxpZGF0b3JPYmplY3QpIHtcclxuICAgICAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUudHJpbSgpLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50cmltKCkubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWxpZGF0YWJsZUlucHV0Lm1heCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7ICBQcm9qZWN0SW5wdXQgfSAgZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XG5pbXBvcnQgeyAgUHJvamVjdExpc3QgfSAgZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3RcIjtcblxuXG5cbiAgICBuZXcgUHJvamVjdElucHV0KCk7XG4gICAgbmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcbiAgICBuZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7ICBcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=