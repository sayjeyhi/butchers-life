(namespace (read-string "ns"))

(module meat-gas-station GOVERNANCE
  (implements gas-payer-v1)
  (use coin)

  (defconst ADMIN_KS:string (+ (read-string "ns") ".admin-keyset"))
  (defconst MEAT_MODULE_PATH:string (+ (read-string "ns") ".meat"))

  (defcap GOVERNANCE ()
    (enforce-keyset ADMIN_KEYSET)
  )



  (defun chain-gas-price ()
    (at 'gas-price (chain-data))
  )

  (defun enforce-below-or-at-gas-price:bool (gasPrice:decimal)
    (enforce (<= (chain-gas-price) gasPrice)
      (format "Gas Price must be smaller than or equal to {}" [gasPrice]))
  )

  (defcap GAS_PAYER:bool (user:string limit:integer price:decimal)
    (enforce (= "exec" (at "tx-type" (read-msg))) "Can only be used inside an exec")
    (enforce (= 1 (length (at "exec-code" (read-msg)))) "Can only be used to call one pact function")
    (enforce
      (contains MEAT_MODULE_PATH (at 0 (at "exec-code" (read-msg))))
      "Only meat module calls are allowed"
    )
    (enforce-below-or-at-gas-price 0.00001)
    (compose-capability (ALLOW_GAS))
  )

  (defcap ALLOW_GAS () true)

  (defun create-gas-payer-guard:guard ()
    (create-user-guard (gas-payer-guard))
  )

  (defun gas-payer-guard ()
    (require-capability (GAS))
  )

  (defconst GAS_STATION_ACCOUNT "meat-gas-station")

  (defun init ()
    (coin.create-account GAS_STATION_ACCOUNT (create-gas-payer-guard))
  )
)

(if (read-msg "init")
  [(init)]
  ["not creating the gas station account"]
)

(if (read-msg "upgrade")
  ["upgrading"]
  ["not upgrading"]
)
