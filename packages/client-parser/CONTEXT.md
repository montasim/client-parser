# Client Classification

This package classifies a client environment from browser- or server-provided evidence. Its results are useful hints for analytics and presentation decisions, not proof of a client's identity or capabilities.

## Language

**Client**:
The user agent making a request, such as a browser, crawler, web view, or command-line HTTP tool.
_Avoid_: Device, user

**Evidence**:
Input supplied by the client or request, including a User-Agent string, Client Hints, headers, platform, and touch-point count.
_Avoid_: Truth, identity

**Classification**:
The normalized browser, operating system, device category, engine, and bot information inferred from evidence.
_Avoid_: Fingerprint, identification

**Device category**:
A broad form factor such as mobile, tablet, desktop, TV, console, wearable, or embedded. It does not imply a specific model.
_Avoid_: Device type, platform

**Detection source**:
The kind of evidence that contributed to a classification: User-Agent, Client Hints, HTTP headers, or platform signals.
_Avoid_: Provider

**Confidence**:
A coarse indication of evidence quality: high, medium, or low. It is not a probability or security guarantee.
_Avoid_: Accuracy score, certainty
