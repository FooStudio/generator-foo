/* eslint-disable */
/**
 * Created by mendieta on 1/2/16.
 */

import React from "react"
import {render} from "react-dom"

/**
 * Base component for DOM visualization, built on top of React.
 */
export default class Component extends React.Component {

    /**
     * Not intended to be called directly from Javascript, internally called from React and JSX
     * @param {object} props The props passed to the component
     * @return {void}
     */
    constructor ( props ) {
        super( props );
        this.init();
    }

    /**
     * Called right component construction, not yet mounted or render. Set initial data here.
     * @abstract
     * @return {void}
     */
    init () {

    }

    /**
     * @ignore
     * @returns {void}
     */
    componentWillMount () {
        this.onBeforeRender();
    }

    /**
     * Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call
     * setState within this method, render() will see the updated state and will be executed only once despite the
     * state change.
     * @abstract
     * @return {void}
     */
    onBeforeRender () {

    }

    /**
     * @ignore
     * @returns {void}
     */
    componentDidMount () {
        this.onRender();
    }

    /**
     * Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this
     * point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM
     * representation). The onRender() method of child components is invoked before that of parent components.
     *
     * If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, or send
     * AJAX requests, perform those operations in this method.
     * @abstract
     * @return {void}
     */
    onRender () {
    }

    /**
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * Use this as an opportunity to react to a prop transition before render() is called by updating the state using
     * this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will
     * not trigger an additional render.
     *
     * If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change. In
     * addition, componentWillUpdate and componentDidUpdate will not be called.
     *
     * By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place, but
     * if you are careful to always treat state as immutable and to read only from props and state in render() then you
     * can override shouldComponentUpdate with an implementation that compares the old props and state to their
     * replacements.
     *
     * If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to
     * speed up your app.
     *
     * @example
     componentWillReceiveProps(nextProps) {
      this.setState({
        likesIncreasing: nextProps.likeCount > this.props.likeCount
      });
    }
     * @abstract
     * @param {object} nextProps The future props to be set
     * @returns {void}
     */
    componentWillReceiveProps ( nextProps ) {

    }

    /**
     * Invoked immediately before rendering when new props or state are being received. This method is not called for
     * the initial render.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     * @param {object} nextProps The future props
     * @param {object} nextState The future state
     * @abstract
     * @returns {void}
     */
    componentWillUpdate ( nextProps, nextState ) {
    }

    /**
     * Invoked before rendering when new props or state are being received. This method is not called for the initial
     * render or when forceUpdate is used.
     *
     * Use this as an opportunity to return false when you're certain that the transition to the new props and state
     * will not require a component update.
     * @example
     shouldComponentUpdate(nextProps, nextState) {
      return nextProps.id !== this.props.id;
    }
     * @param {object} nextProps The future props
     * @param {object} nextState The future state
     * @abstract
     * @returns {boolean} Default true
     */
    shouldComponentUpdate ( nextProps, nextState ) {
        return true
    }

    /**
     * Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the
     * initial render.
     *
     * Use this as an opportunity to operate on the DOM when the component has been updated.
     * @param {object} prevProps The previous props
     * @param {object} prevState The previous state
     * @abstract
     * @return {void}
     */
    componentDidUpdate ( prevProps, prevState ) {

    }

    /**
     *This is called at the same time as onRender() for components that are initially mounted in a TransitionGroup. It will block other animations from occurring until callback is called.
     *
     * It is only called on the initial render of a TransitionGroup.
     *
     * @param {function} callback Function to be called when the animation has finished
     * @returns {void}
     * @abstract
     */
    componentWillAppear ( callback ) {
        callback();
    }

    /**
     * This is called after the callback function that was passed to componentWillAppear is called.
     * @abstract
     * @return {void}
     */
    componentDidAppear () {
    }

    /**
     * This is called at the same time as onRender() for components added to an existing TransitionGroup. It will block
     * other animations from occurring until callback is called. It will not be called on the initial render of a
     * TransitionGroup.
     * @param {function} callback Function to be called when the animation has finished
     * @abstract
     * @return {void}
     */
    componentWillEnter ( callback ) {
        callback();
    }

    /**
     * This is called after the callback function that was passed to componentWillEnter is called.
     * @abstract
     * @return {void}
     */
    componentDidEnter () {
    }

    /**
     * This is called when the child has been removed from the ReactTransitionGroup. Though the child has been removed,
     * ReactTransitionGroup will keep it in the DOM until callback is called.
     * @param {function} callback Function to be called when the animation has finished
     * @abstract
     * @return {void}
     */
    componentWillLeave ( callback ) {
        callback();
    }

    /**
     * This is called when the willLeave callback is called (at the same time as componentWillUnmount).
     * @abstract
     * @returns {void}
     */
    componentDidLeave () {
    }

    /**
     * @ignore
     * @returns {void}
     */
    componentWillUnmount () {
        this.dispose();
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM.
     *
     * Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that
     * were created in onRender.
     * @abstract
     * @returns {void}
     */
    dispose () {

    }
}
