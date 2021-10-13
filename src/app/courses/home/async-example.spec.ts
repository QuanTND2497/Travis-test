import { fakeAsync, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Test async", () => {
  it("Asynchronous test example - plain promise", fakeAsync(() => {
    let test = false;

    Promise.resolve().then(() => {
      test = true;
    });

    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - Promise + setTimeOut", fakeAsync(() => {
    let count = 0;

    Promise.resolve().then(() => {
      count = 10;

      setTimeout(() => {
        count += 1;
      }, 1000);
    });

    expect(count).toBe(0);

    flushMicrotasks();
    expect(count).toBe(10);
    tick(1000);
    expect(count).toBe(11);
  }));

  it("Asynchronous test example - Observable", fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe((res) => {
      test = true;
    });

    tick(1000)
    expect(test).toBeTruthy();
  }));
});
