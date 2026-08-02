# Use progressive client classification

Client classification combines structured Client Hints with User-Agent and platform fallback because no single source is both universally available and sufficiently detailed. The public result records its detection sources and confidence, and unsupported details are omitted instead of invented; this keeps the synchronous parser portable across browsers and servers while allowing richer asynchronous browser collection where supported.
