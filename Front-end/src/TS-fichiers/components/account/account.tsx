import React from 'react'
import { Button } from '../button/button';
import './account.scss';

interface Props {
  firstName: string
  nbAccount: string
  solde: number
  name: string
}

export function Account({firstName, nbAccount, solde, name}: Props) {
  return (
    <section
    className="account-userPage"
    key={firstName + nbAccount}
  >
    <div className="account-userPage-wrapper">
      <h3 className="account-title">{name}</h3>
      <p className="account-amount">{solde.toFixed(2)}€</p>
      <p className="account-amount-nbAccount">{nbAccount}</p>
    </div>
    <div className="account-content-wrapper cta">
      <Button
        to={``}
        text=">"
        type={""}
        className={"transactions-button"}
        onClick={function (
          event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  </section>

  )
}