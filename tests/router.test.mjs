import Event from "events";
import {Router} from "../sources/router.mjs";

describe("Router", () => {
    test("It should be defined.", () => {
        expect(typeof Router).toBe("function");
    });

    describe("getInstance", () => {
        test("It should return a new instance if it did not exist.", () => {
            expect(Router.getInstance()).toBeInstanceOf(Router);
        });
    });

    describe("on", () => {
        test("It should throw if no arguments are passed", () => {
            expect(() => Router.on()).toThrow(Error);
        });

        test("It should throw if one argument is passed", () => {
            expect(() => Router.on("")).toThrow(Error);
        });

        test("It should throw if more than two arguments are passed", () => {
            expect(() => Router.on("", () => 1, "")).toThrow(Error);
        });

        test("It should throw if the first argument is not a string.", () => {
            expect(() => Router.on(1, () => 1)).toThrow(TypeError);
        });

        test("It should throw if the second argument is not a function.", () => {
            expect(() => Router.on("", "")).toThrow(TypeError);
        });

        test("It should not throw when passing a string and a callback.", () => {
            expect(() => Router.on("", () => 1)).not.toThrow();
        });
    });

    describe("goToPage", () => {
        test("It should throw if passing no arguments.", () => {
            expect(() => Router.goToPage()).toThrow(Error);
        });

        test("It should throw if passing more than one argument.", () => {
            expect(() => Router.goToPage("", "")).toThrow(Error);
        });

        test("It should throw if the first argument is not a string.", () => {
            expect(() => Router.goToPage(1)).toThrow(TypeError);
        });

        test("It should throw if the browser does not support the History API.", () => {
            const globalWindow = jest.spyOn(global, "window", "get");

            globalWindow.mockImplementation(() => ({
                history: null
            }));

            expect(() => Router.goToPage("")).toThrow(Error);

            globalWindow.mockRestore();

            jest.clearAllMocks();
        });

        test("It should trigger the history push state.", () => {
            const windowSpy = jest.spyOn(global, "window", "get");
            const pushStateMock = jest.fn();

            windowSpy.mockImplementation(() => ({
                CustomEvent: jest.fn(),
                dispatchEvent: jest.fn(),
                history: {
                    pushState: pushStateMock
                }
            }));

            Router.goToPage("/users");

            expect(pushStateMock).toHaveBeenCalled();

            jest.clearAllMocks();
        });

        test("It should trigger the dispatch event.", () => {
            const windowSpy = jest.spyOn(global, "window", "get");
            const dispatchEventMock = jest.fn();

            windowSpy.mockImplementation(() => ({
                CustomEvent: jest.fn(),
                dispatchEvent: dispatchEventMock,
                history: {
                    pushState: jest.fn()
                }
            }));

            Router.goToPage("/users");

            expect(dispatchEventMock).toHaveBeenCalled();

            jest.clearAllMocks();
        });
    });

    describe("onPageNotFound", () => {
        test("It should throw if passing no arguments.", () => {
            expect(() => Router.onPageNotFound()).toThrow(Error);
        });

        test("It should throw if passing more than one argument.", () => {
            expect(() => Router.onPageNotFound(() => 1, () => 1)).toThrow(Error);
        });

        test("It should throw if the first argument is not a function.", () => {
            expect(() => Router.onPageNotFound(1)).toThrow(TypeError);
        });

        test("It should not throw if the first argument is a function.", () => {
            expect(() => Router.onPageNotFound(() => 1)).not.toThrow();
        });
    });

    describe("start", () => {
        test("It should throw if some arguments are passed.", () => {
            expect(() => Router.start(1)).toThrow(Error);
        });

        test("It should listen for page changes.", () => {
            const windowSpy = jest.spyOn(global, "window", "get");
            const mockedAddEventListener = jest.fn();
            const emitter = new Event();

            windowSpy.mockImplementation(() => ({
                addEventListener: mockedAddEventListener,
                CustomEvent: jest.fn(eventName => eventName),
                dispatchEvent: jest.fn(eventName => {
                    emitter.emit(eventName);
                }),
                history: {
                    pushState: jest.fn((a, b, newPathName) => {
                        window.location.pathname = newPathName;
                    })
                },
                location: {
                    pathname: "/"
                }
            }));

            Router.start();

            expect(mockedAddEventListener).toHaveBeenCalled();

            jest.clearAllMocks();
        });

        test("It should call the addEventListener callback on page change.", () => {
            const windowSpy = jest.spyOn(global, "window", "get");
            const addEventListenerMock = jest.fn();
            const emitter = new Event();

            windowSpy.mockImplementation(() => ({
                addEventListener: addEventListenerMock,
                CustomEvent: jest.fn(eventName => eventName),
                dispatchEvent: jest.fn(eventName => {
                    emitter.emit(eventName);
                }),
                history: {
                    pushState: jest.fn((a, b, newPathName) => {
                        window.location.pathname = newPathName;
                    })
                },
                location: {
                    pathname: "/"
                }
            }));

            Router.on("/", jest.fn());
            Router.start();
            Router.goToPage("/");

            expect(addEventListenerMock).toHaveBeenCalled();

            jest.clearAllMocks();
        });

        test("It should call the default page.", () => {
            const windowSpy = jest.spyOn(global, "window", "get");
            const emitter = new Event();
            const pageNotFoundMock = jest.fn();

            windowSpy.mockImplementation(() => ({
                addEventListener: jest.fn((eventName, callback) => {
                    emitter.on(eventName, callback);
                }),
                CustomEvent: jest.fn(eventName => eventName),
                dispatchEvent: jest.fn(eventName => {
                    emitter.emit(eventName);
                }),
                history: {
                    pushState: jest.fn((a, b, pathname) => {
                        window.location.pathname = pathname;
                    })
                },
                location: {
                    pathname: "/not-found"
                }
            }));

            Router.on("/", jest.fn());
            Router.onPageNotFound(pageNotFoundMock);
            Router.start();

            expect(pageNotFoundMock).toHaveBeenCalled();

            jest.clearAllMocks();
        });
    });
});
