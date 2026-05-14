import { ActionCreator, MemoizedSelector, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

export function createLoadIfNeededEffect<
  TAction extends { [key: string]: any },
  TState,
  TResult
>(
  actions$: Actions,
  store: Store<TState>,
  config: {
    triggerAction: ActionCreator;
    selectLoaded: MemoizedSelector<TState, boolean>; //(state: TState) => boolean;
    fetch: (action: TAction) => Observable<TResult>;
    successAction: (result: TResult, action: TAction) => any;
    //failureAction?: (error: any, action: TAction) => any;
  }, reload: boolean = false
) {
  return actions$.pipe(
    ofType(config.triggerAction),
    withLatestFrom(store.select(config.selectLoaded)),
    filter(([action, loaded]) => !loaded || reload),
    switchMap(([action, _]) =>
      config.fetch(action as TAction).pipe(
        switchMap(result => {
          const actions = config.successAction(result, action as TAction);

          return Array.isArray(actions)
            ? actions
            : [actions];
        }),
        catchError(error =>
          //of(config.failureAction(error, action as TAction))
          of(error)
        )
      )
    )
  );
}

