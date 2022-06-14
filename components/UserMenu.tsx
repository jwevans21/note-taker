import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Dropdown.module.scss';

type Props = {
   name: string;
   image?: string;
};

const UserMenu = ({ name, image }: Props) => {
   return (
      <div className={styles.dropdown}>
         <div className={styles.content}>
            <span className={styles.image}>
               {image && <Image src={image} alt={name} />}
               {!image && (
                  <svg
                     xmlns='http://www.w3.org/2000/svg'
                     width='32'
                     height='32'
                     fill='currentColor'
                     className='bi bi-person-circle'
                     viewBox='0 0 16 16'>
                     <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                     <path
                        fillRule='evenodd'
                        d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                     />
                  </svg>
               )}
            </span>
            <span className={styles.name}>{name}</span>
         </div>
         <ul className={styles.list}>
            <li className={styles.item}>
               <Link href='/settings'>
                  <a>Settings</a>
               </Link>
            </li>
            <li className={styles.item}>
               <Link href='/api/logout'>
                  <a>Logout</a>
               </Link>
            </li>
         </ul>
      </div>
   );
};

export default UserMenu;
