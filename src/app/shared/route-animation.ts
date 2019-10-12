import { trigger, transition, style, animate } from '@angular/animations';

export const  routeFadeStateTrigger = trigger('routeFadeState', [
    transition(':enter', [
        style({
            opacity: 0
        }),
        animate(1000)
    ]),
    transition(':leave', animate(500, style({
        opacity: 0
    })))
]);

export const routeSlideUpToBottomStateTrigger = trigger('routeSlideUpToBottomState', [
    transition(':enter', [
        style({
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate(500)
    ]),
    transition(':leave', animate(500, style({
        transform: 'translateY(100%)',
        opacity: 0
    })))
]);

export const routeSlideUpToBottomStateForInnerUseTrigger = trigger('routeSlideUpToBottomStateForInnerUse', [
    transition(':enter', [
        style({
            transform: 'translateY(-100%)',
            opacity: 0
        }),
        animate(300)
    ]),
    transition(':leave', animate(300, style({
        transform: 'translateY(100%)',
        opacity: 0
    })))
]);

export const routeSlideBottomToUpStateTrigger = trigger('routeSlideBottomToUpState', [
    transition(':enter', [
        style({
            transform: 'translateY(100%)',
            opacity: 0
        }),
        animate(300)
    ]),
    transition(':leave', animate(300, style({
        transform: 'translateY(100%)',
        opacity: 0
    })))
]);

export const routeSlideLeftToRightStateTrigger = trigger('routeSlideLeftToRightState', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0
        }),
        animate(500)
    ]),
    transition(':leave', animate(500, style({
        transform: 'translateX(100%)',
        opacity: 0
    })))
]);

export const routeSlideLeftToRightStateRaidBossTrigger = trigger('routeSlideLeftToRightStateRaidBoss', [
    transition(':enter', [
        style({
            transform: 'translateX(-100%)',
            opacity: 0
        }),
        animate(400)
    ]),
    transition(':leave', animate(400, style({
        transform: 'translateX(100%)',
        opacity: 0
    })))
]);

export const routeSlideRightToLeftStateTrigger = trigger('routeSlideRightToLeftState', [
    transition(':enter', [
        style({
            transform: 'translateX(100%)',
            opacity: 0
        }),
        animate(500)
    ]),
    transition(':leave', animate(500, style({
        transform: 'translateX(-100%)',
        opacity: 0
    })))
]);
