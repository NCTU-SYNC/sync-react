import React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: React.ReactNode;
}

interface IState {
  active: boolean;
  widthString: string;
}

interface ISlideProps{
  order: number;
}

interface ISlideGroupProps {
  className?: string;
}

interface ISlideGroupState {
  className?: string;
  currentImageIndex: number;
  images: string[];
}

const Main = styled.main`
  display: flex;
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
`;

const slideWidth = 30;
const slideHeight = 200;
const SlideBetween = styled.div<ISlideProps>`
  position: absolute;
  width: ${slideWidth}%;
  height: ${slideHeight}px;
  overflow: hidden;
  margin: auto;
  transition: left 2s, opacity 2s, height 2s, width 2s;
  top: 50%;
  transform: translate(-50%, -50%);
  ${props => props.order === 1 && `
    opacity: 0;
    left: 0px;
    height: ${slideHeight / 2}px;
    width: ${slideWidth / 2}%;
  `}
  ${props => props.order === 2 && `
    left: 15%;
  `}
  ${props => props.order === 3 && `
    width: 38%;
    height: 250px;
    left: 50%;
  `}
  ${props => props.order === 4 && `
    left: 85%;
  `}
  ${props => props.order === 5 && `
    opacity: 0;
    height: ${slideHeight / 2}px;
    width: ${slideWidth / 2}%;
    left: 100%;
  `}
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: #eee;
  filter: grayscale(0.5);

  &:hover {
    filter: none;
  }
`;

class PostCarousel extends React.Component<IProps, IState> {
  public render () {
    return (
      <Main>
        <SlideGroup/>
      </Main>
    );
  }
}

class SlideGroup extends React.Component<ISlideGroupProps, ISlideGroupState>  {
  public constructor(props: ISlideGroupProps) {
    super(props);
    this.state = {
      currentImageIndex: 2,
      images: [
        '/static/avatar2.jpg',
        '/static/123.jpg',
        '/static/456.jpg',
        '/static/avatar2.jpg',
        'https://picsum.photos/500/400?random=5',
        'https://picsum.photos/500/400?random=6',
        'https://picsum.photos/500/400?random=7',
        'https://picsum.photos/500/400?random=8',
      ],
    };
  }
  public intervalID: number = 0;
  private generateItems = () => {
    const slideItemList = [];
    const activeIndex = this.state.currentImageIndex;
    let count = 1;
    for (let i = activeIndex - 2; i < activeIndex + 3; i++) {
      let index = i;
      if (i < 0) {
        index = this.state.images.length + i;
      } else if (i >= this.state.images.length) {
        index = i % this.state.images.length;
      }
      const slideOrder = count;
      slideItemList.push(
        <SlideBetween key={index} order={slideOrder}>
          <SlideImg src={this.state.images[index]}/>
        </SlideBetween>
      );
      count = count + 1;
    }
    return slideItemList;
  }
  private moveLeft = () => {
    const index = (this.state.currentImageIndex + 1) % this.state.images.length;
    this.setState({ currentImageIndex: index });
  }
  private moveRight = () => {
    const index = this.state.currentImageIndex - 1 < 0 ? this.state.images.length - 1 : this.state.currentImageIndex;
    this.setState({ currentImageIndex: index });
  }
  public componentDidMount() {
    this.intervalID = setInterval(this.moveLeft, 3000);
  }
  public componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  public render() {
    return (
      <SlideWrapper>
        <button style={{zIndex: 100, position: 'absolute', right: '0px'}} onClick={() => this.moveLeft()}>＞</button>
        {this.generateItems()}
      </SlideWrapper>
    );
  }
}

export default PostCarousel;