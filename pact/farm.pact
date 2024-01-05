(namespace 'free)

(module cow GOVERNANCE
  (defcap GOVERNANCE ()
    "makes sure only admin account can update the smart contract"
    (enforce-guard (at 'guard (coin.details "admin-anedak")))
    ; true
  )

  (implements gas-payer-v1)
  (use coin)

  (defschema gas
    balance:decimal
    guard:guard)

  (deftable ledger:{gas})

  (defcap GAS_PAYER:bool
    ( user:string
      limit:integer
      price:decimal
    )
    (enforce (= "exec" (at "tx-type" (read-msg))) "Inside an exec")
    (enforce (= 1 (length (at "exec-code" (read-msg)))) "Tx of only one pact function")
    (enforce (= "(free.anedak." (take 13 (at 0 (at "exec-code" (read-msg))))) "only free.anedak smart contract")
    (compose-capability (ALLOW_GAS))
  )

  (defcap ALLOW_GAS () true)

  (defun create-gas-payer-guard:guard ()
    (create-user-guard (gas-payer-guard))
  )

  (defun gas-payer-guard ()
    (require-capability (GAS))
    (require-capability (ALLOW_GAS))
  )
)
(coin.transfer-create "8ff29d31d954cbd55ea3173f47455810f4835e8e5de85834a55a1ad296cf9e61" "anedak-gas-payer" (free.anedak-gas-station.create-gas-payer-guard) 2.0)
