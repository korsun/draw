import React from 'react';
import { Button } from '../Button/Button';

import './About.css';

type Props = {
  onClick: () => void;
};

export const About: React.FC<Props> = ({ onClick }) => (
  <div className='About' role='button' onClick={onClick}>
    <div className='About__container' onClick={(event) => {
      event.stopPropagation();
    }}>
      <header className='About__header'>
        <Button title='Close' onClick={onClick} mod='abort' />
      </header>
      <div>
        <h2 className='About__heading'>Nice to meet you,</h2>
        <p>I'm Kirill Korsun, born in Moscow, Russia, though haven't been there quite a while. Last several years I have been working while travelling (let's call it a "digital nomad" lifestyle).</p>
        <p>This is my homework. The task says to describe the program and "how it should be used". Hmm. I think, it definitely could be used for philosophical purposes.</p>
        <p>First, you select three points. This number cannot be accidental, for sure. Three is a magic number. Holy Trinity. The Masonic Eye of Providence inside of a triangle. Egyptian pyramids (technically, they have four faces, but the fourth is under the sand, so doesn't count). Last but not least — by three vertices of a parallelogram you can calculate its area.</p>
        <p>So, the area is calculated, and a circle with the same area is placed in a centre of mass of the parallelogram. If it were to be placed in any other point of the parallelogram, it wouldn't last long. We all remember those times back in our childhood when we had tried to keep a small stick balanced on the finger as long, as possible. The centre of mass is key knowledge here.</p>
        <p>By dragging a point, our parallelogram changes its area and image, and so does our circle. It's a great example of a stable system. Everything does matter. By changing some part of a system, we are changing the system itself, and the impact is visible by the human eye. Think about it. We are living in a complicated world, so it's not obvious that every action has an impact. It has. In the end, a system will always be balanced. What would be needed to save the balance, is another question.</p>
      </div>
    </div>
  </div>
);
