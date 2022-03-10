export default class Gesture{
    static BONUS_MERGE = 50;
    static onScrollBottom(listInnerRef, merge){
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            return scrollTop + clientHeight <= scrollHeight + merge && scrollTop + clientHeight >= scrollHeight - merge;
        }
    }
}