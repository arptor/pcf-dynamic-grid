import { Action } from "svelte/action";

export const clickOutside: Action =
    function (node: HTMLElement) {
        const handleClick = (event: MouseEvent) => {
            if (node && !node.contains(event?.target as Element) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside',)
                )
            }
        }

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true)
            },
        }
    }
