import css from './../Animator.scss';
import toPairs from 'lodash.topairs';

class CssClass {

  constructor() {
    this.childCssProps = ['opacity', 'scale', 'height', 'width', 'timing'];
    this.parentCssProps = ['sequenceDelay'];
    this.childWrapperProps = ['height', 'width', 'child']; //TBD!!!
    this.baseCss = toPairs({child: true});
  }

  filter(list, key) {
    return list.indexOf(key) > -1;
  }

  map(key, value) {
    if (value) {
      return typeof value === 'boolean' ? css[key] : css[value];
    }
  }

  getCssList(props, cssProps) {
    return toPairs(props)
      .filter(([key]) => this.filter(cssProps, key));
  }

  getChild(props) {
    return this.getCssList(props, this.childCssProps)
      .concat(this.baseCss)
      .map(([key, value]) => this.map(key, value))
      .join(' ');
  }

  getChildTranslate(props) {
    const {translate} = props;
    const {to = 'TOP', size = 100} = translate;
    const cssList = translate ? [css.translate, css[`translate-${to.toLowerCase()}`], css[`translate-${size}`]] : [];
    return cssList.join(' ');
  }
  getSequenceIndex(props) {
    const {index, sequenceDelay, childrenLength} = props;
    return sequenceDelay === 'reverse' ? childrenLength - index - 1 : index;
  }

  getChildSequence(props) {
    const {sequenceDelay} = props;
    return sequenceDelay ? css[`childSequenceDelay-${this.getSequenceIndex(props)}`] : '';
  }

  getParent(props) {
    return this.getCssList(props, this.parentCssProps)
      .map(([key, value]) => this.map(key, value))
      .join(' ');
  }

}

export default CssClass;
