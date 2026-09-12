<template>
    <div class="product-skeleton-card">
        <div class="skeleton-img shimmer"></div>
        <div class="skeleton-body">
            <div class="skeleton-line line-sm shimmer"></div>
            <div class="skeleton-line line-md shimmer"></div>
            <div class="skeleton-flex">
                <div class="skeleton-line line-lg shimmer"></div>
                <div class="skeleton-btn shimmer"></div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.product-skeleton-card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-top: 15px;
    padding: 12px;
    overflow: hidden;
}

.skeleton-img {
    width: 100%;
    height: 180px;
    border-radius: 6px;
    background: #e5e7eb;
}

.skeleton-body {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skeleton-line {
    height: 14px;
    border-radius: 4px;
    background: #e5e7eb;

    &.line-sm {
        width: 40%;
    }

    &.line-md {
        width: 85%;
        height: 16px;
    }

    &.line-lg {
        width: 60%;
        height: 20px;
    }
}

.skeleton-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.skeleton-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: #e5e7eb;
}

.shimmer {
    background: linear-gradient(
        90deg,
        #f3f4f6 0%,
        #e5e7eb 50%,
        #f3f4f6 100%
    );
    background-size: 200% 100%;
    animation: shimmerAnimation 1.5s infinite;
}

@keyframes shimmerAnimation {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
