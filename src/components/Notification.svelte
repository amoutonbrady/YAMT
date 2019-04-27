<script context="module">
    export const position = {
        TOP_LEFT: 'TOP_LEFT',
        TOP_CENTER: 'TOP_CENTER',
        TOP_RIGHT: 'TOP_RIGHT',
        BOTTOM_LEFT: 'BOTTOM_LEFT',
        BOTTOM_CENTER: 'BOTTOM_CENTER',
        BOTTOM_RIGHT: 'BOTTOM_RIGHT',
    }
</script>

<script>
    import { fly } from 'svelte/transition'

    const _position = {
        TOP_LEFT: 'top: 15px; left: 15px',
        TOP_CENTER: 'top: 15px; left: 50%, transform: translateX(-50%)',
        TOP_RIGHT: 'top: 15px; right: 15px',
        BOTTOM_LEFT: 'bottom: 15px; left: 15px',
        BOTTOM_CENTER: 'bottom: 15px; left: 50%, transform: translateX(-50%)',
        BOTTOM_RIGHT: 'bottom: 15px; right: 15px',
    }

    let _show = false;
    let _message = '';
    let _timeout = null;
    let _placement = position.BOTTOM_LEFT;

    $: _fly = {
        x: _placement.includes('LEFT')
            ? -200
            : _placement.includes('RIGHT') ? 200 : 0,
        y: _placement === position.TOP_CENTER
            ? -200
            : _placement === position.BOTTOM_CENTER ? 200 : 0,
        duration: 750,
    };

    export function hide() {
        clearTimeout(_timeout);
        _show = false;
        _message = '';
    }

    export function showTime({ message, duration, placement }) {
        _message = message;
        _show = true;

        if (placement) _placement = placement;

        _timeout = setTimeout(hide, duration);
    }
</script>


<!-- VIEW -->

{#if _show}
    <div transition:fly={_fly} style={_position[_placement]}>
        <button on:click={hide}>
            <svg
                viewBox="0 0 24 24"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        <p>{_message}</p>
    </div>
{/if}


<!-- STYLES -->

<style>
    div {
        position: fixed;
        padding: 18px;
        z-index: 42;
        background-color: #4a69bd;
        border-radius: 4px;
        color: #fff;
        box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.05);
    }

    button {
        position: absolute;
        top: 5px;
        right: 5px;
        line-height: 1;
    }

    svg {
        height: 15px;
        width: 15px;
        stroke: #fff;
    }

    p {
        font-weight: bold;
        margin: 0 5px 0 0;
    }
</style>