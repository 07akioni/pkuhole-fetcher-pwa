

/*
 * For Routing
 */
export const SET_CURRENT_TYPE = Symbol('ACTION_SET_CURRENT_TYPE')

/*
 * For AllPosts.js
 */
export const SET_POSTS_LOADING = Symbol('ACTION_SET_POSTS_LOADING')
export const CLEAR_POSTS       = Symbol('ACTION_CLEAR_POSTS')
export const APPEND_POSTS      = Symbol('ACTION_APPEND_POSTS')
export const SET_FROMPID       = Symbol('ACTION_SET_FROMPID')

/*
 * For HotPosts.js
 */
export const SET_HOT_POSTS_LOADING = Symbol('ACTION_SET_HOT_POST_LOADING')
export const CLEAR_HOT_POSTS       = Symbol('ACTION_CLEAR_HOT_POSTS')
export const APPEND_HOT_POSTS      = Symbol('ACTION_APPEND_HOT_POSTS')
export const SET_HOT_FROMPID       = Symbol('ACTION_SET_HOT_FROMPID')

/*
 * For DeletedPosts.js
 */
export const SET_DELETED_POSTS_LOADING = Symbol('ACTION_SET_DELETED_LOADING')
export const CLEAR_DELETED_POSTS       = Symbol('ACTION_CLEAR_HOT_POSTS')
export const APPEND_DELETED_POSTS      = Symbol('ACTION_APPEND_DELETED_POSTS')
export const SET_DELETED_FROMPID       = Symbol('ACTION_SET_DELETED_FROMPID')

/*
 * For PostDetail.js
 */
export const SET_DETAIL_LOADING = Symbol('ACTION_SET_DETAIL_LOADING')
export const CLEAR_DETAIL       = Symbol('ACTION_CLEAR_DETAIL')
export const SET_DETAIL_HEAD    = Symbol('ACTION_SET_DETAIL_HEAD')
export const SET_DETAIL_BODY    = Symbol('ACTION_SET_DETAIL_BODY')

/*
 * For Search.js
 */
export const SET_SEARCH_LOADING  = Symbol('ACTION_SET_SEARCH_LOADING')
export const APPEND_SEARCH_POSTS = Symbol('ACTION_APPEND_SEARCH_POSTS')
export const CLEAR_SEARCH_POSTS  = Symbol('ACTION_CLEAR_SEARCH_POSTS')
export const SET_SEARCH_KEYWORDS = Symbol('ACTION_CLEAR_SEARCH_KEYWORDS')