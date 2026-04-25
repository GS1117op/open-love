export function AffiliateBanner() {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-5xl justify-center px-4 py-8 sm:py-10">
        <div className="flex w-full max-w-xl flex-col items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500">SPONSORED</p>
          <a
            href="https://px.a8.net/svt/ejp?a8mat=4B1SPS+F75DPU+5GRC+5ZMCH"
            rel="nofollow sponsored"
          >
            <img
              width={300}
              height={250}
              alt="\u30b9\u30dd\u30f3\u30b5\u30fc\u5e83\u544a"
              src="https://www27.a8.net/svt/bgt?aid=260424352919&wid=001&eno=01&mid=s00000025500001006000&mc=1"
              className="border-0"
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
      </div>
    </section>
  );
}
