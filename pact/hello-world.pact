;; All Pact modules must exist within a namespace on Chainweb, except for basic contracts provided by Kadena.
;; There are two namespaces available for anyone to use on Chainweb: the 'free' namespace and the 'user'
(namespace 'free )
;; Define `hello-world` module with the `G` capability
(module hello-world G
  (defcap G () true)
  (defun say-hello(name:string)
    (format "Hello, {}!" [name])
  )
)
