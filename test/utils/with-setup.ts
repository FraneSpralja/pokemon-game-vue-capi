import { createApp } from "vue";

export const withSetup = (composable: () => any) => {

    let result: any;

    const app = createApp({
        setup() {

            result = composable()

            return () => {}
        }
    })

    app.mount(document.createElement('DIV'));

    return [ result, app ] as const;

}