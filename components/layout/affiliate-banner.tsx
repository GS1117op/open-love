export function AffiliateBanner() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255, 77, 141, 0.15)" }}>
      {/* Related services */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <p
          className="mb-5 text-center text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "#b09fc8" }}
        >
          関連サービス
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <a
            href="https://open-love-sepia.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-4 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderRadius: "16px",
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(255, 77, 141, 0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl">💞</span>
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: "#f0e6ff" }}
              >
                OpenLove
              </p>
              <p className="mt-0.5 text-xs truncate" style={{ color: "#b09fc8" }}>
                恋愛・セックスのリアルデータ
              </p>
            </div>
          </a>

          <a
            href="https://gs1117op.github.io/sex-diagnosis/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-4 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderRadius: "16px",
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(155, 45, 214, 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl">🧬</span>
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: "#f0e6ff" }}
              >
                SEX 16タイプ診断
              </p>
              <p className="mt-0.5 text-xs truncate" style={{ color: "#b09fc8" }}>
                あなたのセックスタイプは？
              </p>
            </div>
          </a>

          <a
            href="https://gs1117op.github.io/sex-value/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-4 py-4 transition-all duration-200 hover:-translate-y-1"
            style={{
              borderRadius: "16px",
              background: "rgba(42, 17, 69, 0.7)",
              border: "1px solid rgba(255, 77, 141, 0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-2xl">📊</span>
            <div className="min-w-0 flex-1">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: "#f0e6ff" }}
              >
                SEX偏差値診断
              </p>
              <p className="mt-0.5 text-xs truncate" style={{ color: "#b09fc8" }}>
                偏差値でわかる性の立ち位置
              </p>
            </div>
          </a>
        </div>

        {/* X (Twitter) round button */}
        <div className="mt-6 flex justify-center">
          <a
            href="https://x.com/openlove_JP"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-12 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-1"
            style={{
              background: "linear-gradient(135deg, #ff4d8d, #9b2dd6)",
              boxShadow: "0 4px 16px rgba(255, 77, 141, 0.35)",
            }}
            aria-label="X (@openlove_JP)"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5 fill-white"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
        </div>
        <p
          className="mt-2 text-center text-xs"
          style={{ color: "#b09fc8" }}
        >
          @openlove_JP
        </p>
      </div>

      {/* Affiliate ads */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255, 77, 141, 0.1)" }}
      >
        <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 sm:py-10">
          <div
            className="flex w-full flex-col items-center gap-3 px-4 py-6"
            style={{
              borderRadius: "20px",
              background: "rgba(42, 17, 69, 0.5)",
              border: "1px solid rgba(255, 77, 141, 0.12)",
            }}
          >
            <p
              className="text-xs font-medium tracking-[0.18em]"
              style={{ color: "#b09fc8" }}
            >
              SPONSORED
            </p>
            <div className="grid w-full justify-items-center gap-4 lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4B1SPS+F75DPU+5GRC+5ZMCH"
                  rel="nofollow sponsored"
                >
                  <img
                    width={300}
                    height={250}
                    alt="スポンサー広告"
                    src="https://www27.a8.net/svt/bgt?aid=260424352919&wid=001&eno=01&mid=s00000025500001006000&mc=1"
                    className="h-auto max-w-full border-0"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www15.a8.net/0.gif?a8mat=4B1SPS+F75DPU+5GRC+5ZMCH"
                  alt=""
                  className="border-0"
                />
              </div>
              <div className="flex flex-col items-center">
                <a href="https://px.a8.net/svt/ejp?a8mat=4B1WLZ+FQ792Q+4YJS+60OXD" rel="nofollow">
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www24.a8.net/svt/bgt?aid=260429399951&wid=001&eno=01&mid=s00000023140001011000&mc=1"
                    className="h-auto max-w-full border-0"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www18.a8.net/0.gif?a8mat=4B1WLZ+FQ792Q+4YJS+60OXD"
                  alt=""
                  className="border-0"
                />
              </div>
              <div className="flex flex-col items-center">
                <a href="https://px.a8.net/svt/ejp?a8mat=4B1SPS+EC6U9E+32P0+HWAG1" rel="nofollow">
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www26.a8.net/svt/bgt?aid=260424352867&wid=001&eno=01&mid=s00000014346003006000&mc=1"
                    className="h-auto max-w-full border-0"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www10.a8.net/0.gif?a8mat=4B1SPS+EC6U9E+32P0+HWAG1"
                  alt=""
                  className="border-0"
                />
              </div>
              <div className="flex flex-col items-center">
                <a href="https://px.a8.net/svt/ejp?a8mat=4B1WLZ+G7GTMA+3LOM+1BOLU9" rel="nofollow">
                  <img
                    width={300}
                    height={250}
                    alt=""
                    src="https://www29.a8.net/svt/bgt?aid=260429399980&wid=001&eno=01&mid=s00000016807008009000&mc=1"
                    className="h-auto max-w-full border-0"
                  />
                </a>
                <img
                  width={1}
                  height={1}
                  src="https://www12.a8.net/0.gif?a8mat=4B1WLZ+G7GTMA+3LOM+1BOLU9"
                  alt=""
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
