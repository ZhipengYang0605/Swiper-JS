(function () {
    // 1.获取元素
    var swiperWrapper = document.querySelector('.swiper-wrapper-box')
    var swiperItemList = document.querySelectorAll('.swiper-item ')
    var iconItemList = document.querySelectorAll('.icon-item')
    var swiper = document.querySelector('.swiper')
    // 转为数字组
    var iconArrayList = Array.from(iconItemList)

    // 初始化设置
    var startPosition = 0 // 轮播图刚开始的位置为0
    swiperWrapper.style.left = startPosition + 'px'
    var swiperleft = 0 // 定义轮播图初始wei位置为0
    var unitWidth = 600 // 定义轮播图每次滚动的距离
    var swiperWidth = unitWidth * (swiperItemList.length) // 整个轮播图的宽度
    iconArrayList[0].classList.add('active') // 设置初始的激活icon为第一个
    var index = 0 // 设置icon初始下标index为0  
    var intervelTime = 1000 // 设置轮播间隔时间
    var isLoop = false // 是否为循环轮播

    // 实现自动轮播
    var timer = setInterval(autoSwiper, intervelTime);
    // 鼠标进入停止轮播/移出开始轮播
    swiper.addEventListener('mouseover', handleMouseEvent)
    swiper.addEventListener('mouseout', handleMouseEvent)
    // 点击上一张/下一张
    swiper.addEventListener('click', handleClickEvent)
    // 点击icon切换轮播图
    swiper.addEventListener('click', handleClickIcon)
    // 处理鼠标进入/移出事件
    function handleMouseEvent (e) {
        var className = e.target.className
        if (e.type === 'mouseover') {
            if (className === 'arrow-l') {
                clearInterval(timer)
            } else if (className === 'arrow-r') {
                clearInterval(timer)
            } else if (e.target.classList.contains('swiper-item')) {
                clearInterval(timer)
            } else if (e.target.classList.contains('icon-item')) {
                clearInterval(timer)
            }
        } else {
            if (className === 'arrow-l') {
                timer = setInterval(autoSwiper, intervelTime)
            } else if (className === 'arrow-r') {
                timer = setInterval(autoSwiper, intervelTime)
            } else if (e.target.classList.contains('swiper-item')) {
                timer = setInterval(autoSwiper, intervelTime)
            } else if (e.target.classList.contains('icon-item')) {
                timer = setInterval(autoSwiper, intervelTime)
            }
        }
    }
    // 自动轮播
    function autoSwiper () {
        // 每次执行前将所有的active样式设置为空
        iconArrayList.forEach(function (item) {
            item.classList.remove('active')
        })
        // 判断是否循环轮播，是则从第二张开始
        if (isLoop) {
            startPosition = unitWidth
            index = 1
            isLoop = false
        }
        if (startPosition <= swiperWidth - unitWidth && index < iconArrayList.length) {
            swiperWrapper.style.left = -startPosition + 'px'
            // 获取swiper的left值
            swiperleft = -parseInt(swiperWrapper.style.left)
            // 根据条件激活对应样式
            if (startPosition == swiperleft) {
                iconArrayList[index].classList.add('active')
            }
            startPosition += unitWidth
            index++
        } else { // 实现循环滚动
            swiperWrapper.style.left = 0 + 'px'
            iconArrayList[0].classList.add('active')
            startPosition = 0
            index = 0
            isLoop = true
        }
    }
    // 处理点击事件
    function handleClickEvent (e) {
        // 获取类名
        var className = e.target.className
        // 获取swiper的left值
        swiperleft = -parseInt(swiperWrapper.style.left)
        if (className === 'arrow-l') { // 点击上一张
            // 每次执行前将所有的active样式设置为空
            iconArrayList.forEach(function (item) {
                item.classList.remove('active')
            })
            startPosition = swiperleft - unitWidth
            index = startPosition / unitWidth
            if (startPosition >= 0) {
                swiperWrapper.style.left = -startPosition + 'px'
                iconArrayList[index].classList.add('active')
            } else { // 循环轮播
                index = iconItemList.length - 1
                swiperWrapper.style.left = - unitWidth * index + 'px'
                iconArrayList[index].classList.add('active')
                startPosition = swiperWidth
            }
        } else if (className === 'arrow-r') { // 点击下一张
            // 每次执行前将所有的active样式设置为空
            iconArrayList.forEach(function (item) {
                item.classList.remove('active')
            })
            startPosition = -swiperleft - unitWidth
            index = Math.abs(startPosition) / unitWidth
            if (startPosition >= unitWidth - swiperWidth && startPosition <= 0) {
                swiperWrapper.style.left = startPosition + 'px'
                iconArrayList[index].classList.add('active')
                startPosition = Math.abs(startPosition)
                if (startPosition === unitWidth - swiperWidth) {
                    startPosition = swiperWidth // 解决点击到最后一张，自动轮播到第一张报错的问题
                }
            } else { // 循环轮播
                index = 0
                swiperWrapper.style.left = 0 + 'px'
                iconArrayList[index].classList.add('active')
                startPosition = 0
            }
        }
    }
    // 处理点击icon切换轮播图事件
    function handleClickIcon (e) {
        // 获取类名
        var className = e.target.className
        if (className.substring(0, 9) === 'icon-item') {
            index = e.target.dataset.index - 1
            // 每次执行前将所有的active样式设置为空
            iconArrayList.forEach(function (item) {
                item.classList.remove('active')
            })
            iconArrayList[index].classList.add('active')
            startPosition = index * unitWidth
            swiperWrapper.style.left = -startPosition + 'px'
        }
    }
}())