import React from 'react';

import styles from '../styles/Strength.module.scss';

const StrengthMeter = ({ strength }: { strength: number }) => {
   const [color, setColor] = React.useState('var(--clr-danger');

   React.useEffect(
      function () {
         if (strength <= 2) {
            setColor('var(--clr-danger)');
         } else if (strength === 3) {
            setColor('var(--clr-warning)');
         } else if (strength === 4) {
            setColor('var(--clr-success)');
         }
      },
      [strength]
   );

   return (
      <div className={styles.strength}>
         <div
            className={styles.strength__bar}
            style={{
               width: `${((strength === 0 ? 1 : strength) / 4) * 100}%`,
               backgroundColor: color,
            }}
         />
         <div className={styles.strength__text} style={{ color: color }}>
            {strength <= 2 ? 'Weak' : strength === 4 ? 'Strong' : 'Medium'}{' '}
            Password
         </div>
      </div>
   );
};

export default StrengthMeter;
