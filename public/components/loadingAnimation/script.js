const loadingAnimation = document.getElementsByClassName('loadingAnimation')[0];
loadingAnimation.style.display = 'none';
loadingAnimation.style.opacity = 0;
loadingAnimation.style.transition = 'opacity 0.3s';
loadingAnimation.src = '/components/loadingAnimation/loading.gif';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const showLoadingAnimation = async() => {
    loadingAnimation.style.display = 'inline-block';
    await sleep(300);
    loadingAnimation.style.opacity = 1;
};
export const hideLoadingAnimation = async() => {
    loadingAnimation.style.opacity = 0;
    await sleep(300);
    loadingAnimation.style.display = 'none';
};