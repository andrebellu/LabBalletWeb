export function reveal(node, opts = {}) {
    const { delay = 0, y = 24, once = true, threshold = 0.15 } = opts;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return {};

    node.style.opacity = "0";
    node.style.transform = `translateY(${y}px)`;
    node.style.transition =
        `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms`;
    node.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
        ([e]) => {
            if (e.isIntersecting) {
                node.style.opacity = "1";
                node.style.transform = "none";
                if (once) io.unobserve(node);
            } else if (!once) {
                node.style.opacity = "0";
                node.style.transform = `translateY(${y}px)`;
            }
        },
        { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(node);
    return { destroy: () => io.disconnect() };
}