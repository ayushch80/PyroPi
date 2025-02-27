<a href="/add" class="add-new">+</a>

<style>
    .add-new {
        --side: 1.75em;

        display: flex;
        text-decoration: none;

        position: absolute;
        right: 1vw;
        bottom: 1vh;

        width: var(--side);
        height: var(--side);

        justify-content: center;
        align-items: center;

        font-size: var(--side);

        cursor: pointer;

        border: none;
        border-radius: 0.25em;

        background: #fff;
        color: #222;

        transition:
            border-radius 50ms ease-in-out,
            background 20ms ease-in-out;
    }
    .add-new:hover {
        border-radius: 0.5em;
    }
    .add-new:active {
        background: #aaa;
    }
</style>
